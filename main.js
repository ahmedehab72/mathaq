(() => {
  "use strict";

  const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
  const smoothstep = (p, e0, e1) => {
    const t = clamp((p - e0) / (e1 - e0));
    return t * t * (3 - 2 * t);
  };

  const body = document.body;
  const nav = document.querySelector(".site-nav");
  const hero = document.querySelector(".scrub-hero");
  const stage = document.getElementById("stage");
  const poster = document.getElementById("poster");
  const video = document.getElementById("heroVideo");
  const ring = document.querySelector(".loading-ring");
  const progressLabel = document.getElementById("progressLabel");
  const bands = [...document.querySelectorAll(".band")].map((el, index) => ({
    el,
    index,
    a: Number(el.dataset.a),
    b: Number(el.dataset.b),
    op: -1,
    k: -1,
  }));

  const GATES = [
    "(max-width: 720px)",
    "(orientation: portrait) and (max-width: 1024px)",
    "(orientation: portrait) and (pointer: coarse)",
    "(orientation: landscape) and (pointer: coarse) and (max-height: 560px)",
    "(prefers-reduced-motion: reduce)",
  ];
  const MQLS = GATES.map((query) => matchMedia(query));
  const reduceQuery = MQLS[4];

  let scrubOn = false;
  let heroInitialized = false;
  let heroOnScreen = true;
  let target = 0;
  let shown = 0;
  let rafId = null;
  let lastTick = 0;
  let seekBusy = false;
  let pendingTime = null;
  let videoReady = false;
  let loadStart = performance.now();
  let lastProgressText = "";
  let lastProgressAt = 0;
  let blobUrl = "";

  document
    .querySelectorAll("[data-split] h1, [data-split] h2")
    .forEach((heading, headingIndex) => {
      const text = heading.textContent.trim();
      heading.setAttribute("aria-label", text);
      heading.textContent = "";
      text.split(/\s+/).forEach((word, wordIndex, words) => {
        const span = document.createElement("span");
        span.className = "word";
        span.setAttribute("aria-hidden", "true");
        span.style.setProperty(
          "--th",
          String((wordIndex / Math.max(1, words.length)) * 0.4),
        );
        span.style.setProperty("--kc", "0");
        span.textContent =
          word + (wordIndex < words.length - 1 ? "\u00a0" : "");
        heading.append(span);
      });
      heading.dataset.seed = String(headingIndex + 1);
    });

  function heroProgress() {
    const range = Math.max(1, hero.offsetHeight - innerHeight);
    return clamp((scrollY - hero.offsetTop) / range);
  }

  function requestSeek(time) {
    if (!videoReady || !video.duration || !Number.isFinite(time)) return;
    if (seekBusy) {
      pendingTime = time;
      return;
    }
    seekBusy = true;
    try {
      video.currentTime = clamp(time, 0, Math.max(0, video.duration - 0.001));
    } catch {
      seekBusy = false;
    }
  }

  video.addEventListener("seeked", () => {
    seekBusy = false;
    if (pendingTime !== null) {
      const next = pendingTime;
      pendingTime = null;
      requestSeek(next);
    }
  });

  video.addEventListener("error", () => {
    seekBusy = false;
    pendingTime = null;
    failVideo();
  });

  function updateCaptions(progress, now = performance.now()) {
    const loadK = clamp((now - loadStart) / 1000);
    bands.forEach((band) => {
      const fade = Math.min(0.02, (band.b - band.a) / 3);
      const inOpacity =
        band.index === 0 ? 1 : smoothstep(progress, band.a, band.a + fade);
      const outOpacity =
        band.index === bands.length - 1
          ? 1
          : 1 - smoothstep(progress, band.b - fade, band.b);
      const opacity = inOpacity * outOpacity;
      const ramp = Math.min(0.025, (band.b - band.a) * 0.35);
      let k = clamp((progress - band.a) / ramp);
      if (band.index === 0) k = Math.max(k, loadK);

      if (Math.abs(opacity - band.op) > 0.004) {
        band.op = opacity;
        band.el.style.opacity = opacity.toFixed(3);
      }
      if (Math.abs(k - band.k) > 0.008) {
        band.k = k;
        band.el.style.setProperty("--k", k.toFixed(3));
        band.el.querySelectorAll(".word").forEach((word) => {
          const threshold = Number(word.style.getPropertyValue("--th")) || 0;
          word.style.setProperty(
            "--kc",
            clamp((k - threshold) * 2.8).toFixed(3),
          );
        });
      }
    });

    if (now - lastProgressAt > 100) {
      const text =
        "Pour " + String(Math.round(progress * 100)).padStart(2, "0") + "%";
      if (text !== lastProgressText) {
        progressLabel.textContent = text;
        lastProgressText = text;
      }
      lastProgressAt = now;
    }
    return loadK;
  }

  function tick(now) {
    const dt = Math.min(100, now - (lastTick || now));
    lastTick = now;
    const smoothing = 0.16;
    shown += (target - shown) * (1 - Math.pow(1 - smoothing, dt / 16.667));
    const loadK = updateCaptions(shown, now);
    requestSeek(shown * video.duration);

    if (Math.abs(target - shown) < 0.0005 && loadK >= 1) {
      shown = target;
      updateCaptions(shown, now);
      rafId = null;
      lastTick = 0;
    } else if (heroOnScreen && scrubOn) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
      lastTick = 0;
    }
  }

  function startTick() {
    if (rafId === null && heroOnScreen && scrubOn)
      rafId = requestAnimationFrame(tick);
  }

  let pageRaf = null;
  function updatePageEffects() {
    pageRaf = null;
    // const scrolled = scrollY > 24;
    const scrolled = hero.getBoundingClientRect().bottom <= nav.offsetHeight;
    if (nav.classList.contains("scrolled") !== scrolled)
      nav.classList.toggle("scrolled", scrolled);
    const siteBody = document.querySelector(".site-body");
    const path = document.querySelector(".pour-line path");
    const start = siteBody.offsetTop - innerHeight * 0.7;
    const end = siteBody.offsetTop + siteBody.offsetHeight * 0.72;
    const lineProgress = reduceQuery.matches
      ? 1
      : clamp((scrollY - start) / Math.max(1, end - start));
    const offset = (1 - lineProgress).toFixed(3);
    if (path.style.getPropertyValue("--line-offset") !== offset)
      path.style.setProperty("--line-offset", offset);
  }

  function onScroll() {
    target = heroProgress();
    startTick();
    if (pageRaf === null) pageRaf = requestAnimationFrame(updatePageEffects);
  }

  function failVideo() {
    videoReady = false;
    stage.classList.add("video-failed");
    stage.classList.remove("video-ready");
  }

  async function loadHeroBlob() {
    const VIDEO_URL = "assets/hero-scrub.mp4";
    // const VIDEO_URL = "assets/coffe-video.mp4";

    const VIDEO_BYTES = 1708845;
    const controller = new AbortController();
    let watchdog = setTimeout(() => controller.abort(), 20000);
    const response = await fetch(VIDEO_URL, {
      priority: "low",
      signal: controller.signal,
    });
    if (!response.ok || !response.body) throw new Error("Video fetch failed");
    const total = Number(response.headers.get("Content-Length")) || VIDEO_BYTES;
    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    let lastRing = 0;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      clearTimeout(watchdog);
      watchdog = setTimeout(() => controller.abort(), 20000);
      chunks.push(value);
      received += value.length;
      const fraction = Math.min(1, received / total);
      const now = performance.now();
      if (now - lastRing > 100 || fraction === 1) {
        ring.style.setProperty(
          "--ld",
          String(Math.round(126 * (1 - fraction))),
        );
        lastRing = now;
      }
    }

    clearTimeout(watchdog);
    ring.style.setProperty("--ld", "0");
    blobUrl = URL.createObjectURL(new Blob(chunks, { type: "video/mp4" }));
    video.src = blobUrl;
    video.load();
    video.addEventListener(
      "canplay",
      () => {
        videoReady = true;
        requestSeek(heroProgress() * video.duration);
        stage.classList.add("video-ready");
        startTick();
      },
      { once: true },
    );
  }

  function initHeroOnce() {
    if (heroInitialized) return;
    heroInitialized = true;
    poster.style.backgroundImage = "url('assets/hero-poster.jpg')";
    const posterImage = new Image();
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      loadHeroBlob().catch(failVideo);
    };
    posterImage.onload = start;
    posterImage.onerror = start;
    posterImage.src = "assets/hero-poster.jpg";
    setTimeout(start, 4000);
  }

  function unpinFinalStates() {
    body.classList.remove("motion-pinned");
    if (!document.getElementById("bloomStage").dataset.userComplete)
      resetBloom();
    updatePageEffects();
  }

  function pinToFinalStates() {
    body.classList.add("motion-pinned");
    completeBloom(false);
    document
      .querySelector(".pour-line path")
      .style.setProperty("--line-offset", "0");
  }

  function enableScrub() {
    if (scrubOn) return;
    scrubOn = true;
    unpinFinalStates();
    initHeroOnce();
    addEventListener("scroll", onScroll, { passive: true });
    bands.forEach((band) => {
      band.op = -1;
      band.k = -1;
    });
    target = shown = heroProgress();
    updateCaptions(shown);
    onScroll();
  }

  function disableScrub() {
    if (!scrubOn) return;
    scrubOn = false;
    removeEventListener("scroll", onScroll);
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
    lastTick = 0;
  }

  function applyHeroMode() {
    if (GATES.some((query) => matchMedia(query).matches)) {
      disableScrub();
      if (reduceQuery.matches) pinToFinalStates();
    } else {
      enableScrub();
    }
  }

  MQLS.forEach((query) => query.addEventListener("change", applyHeroMode));
  reduceQuery.addEventListener("change", (event) => {
    if (event.matches) pinToFinalStates();
    else {
      unpinFinalStates();
      applyHeroMode();
    }
  });

  const heroObserver = new IntersectionObserver(
    (entries) => {
      heroOnScreen = entries[0].isIntersecting;
      if (heroOnScreen) startTick();
      else if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
        lastTick = 0;
      }
    },
    { rootMargin: "30% 0px" },
  );
  heroObserver.observe(hero);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("in", "alive");
        setTimeout(() => el.classList.add("settled"), 1000);
        revealObserver.unobserve(el);
      });
    },
    { threshold: 0.16 },
  );
  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  const loopObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) =>
        entry.target.classList.toggle("alive", entry.isIntersecting),
      );
    },
    { threshold: 0.1 },
  );
  document
    .querySelectorAll(".promise-card")
    .forEach((el) => loopObserver.observe(el));

  const bloomStage = document.getElementById("bloomStage");
  const holdButton = document.getElementById("holdButton");
  let hold = 0;
  let holding = false;
  let holdRaf = null;
  let holdLast = 0;

  function renderHold() {
    holdButton.style.setProperty("--hold", hold.toFixed(3));
  }
  function completeBloom(userInitiated = true) {
    hold = 1;
    renderHold();
    bloomStage.classList.add("complete");
    holdButton.querySelector(".hold-label").textContent = "Bloomed";
    holdButton.setAttribute("aria-label", "Flavor notes revealed");
    if (userInitiated) bloomStage.dataset.userComplete = "true";
  }
  function resetBloom() {
    hold = 0;
    holding = false;
    renderHold();
    bloomStage.classList.remove("complete");
    holdButton.querySelector(".hold-label").textContent = "Press and hold";
    holdButton.setAttribute(
      "aria-label",
      "Press and hold to reveal the flavor notes",
    );
  }
  function holdTick(now) {
    const dt = Math.min(50, now - (holdLast || now));
    holdLast = now;
    if (holding) hold = clamp(hold + dt / 1450);
    else if (!bloomStage.classList.contains("complete"))
      hold = clamp(hold - dt / 750);
    renderHold();
    if (hold >= 1) {
      completeBloom(true);
      holding = false;
    }
    if (holding || (hold > 0 && !bloomStage.classList.contains("complete")))
      holdRaf = requestAnimationFrame(holdTick);
    else {
      holdRaf = null;
      holdLast = 0;
    }
  }
  function startHold(event) {
    if (reduceQuery.matches || bloomStage.classList.contains("complete")) {
      completeBloom(true);
      return;
    }
    if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
    if (event.type === "keydown") event.preventDefault();
    holding = true;
    if (event.pointerId !== undefined)
      holdButton.setPointerCapture(event.pointerId);
    if (holdRaf === null) holdRaf = requestAnimationFrame(holdTick);
  }
  function stopHold(event) {
    if (event.type === "keyup" && !["Enter", " "].includes(event.key)) return;
    holding = false;
    if (holdRaf === null && hold > 0 && hold < 1)
      holdRaf = requestAnimationFrame(holdTick);
  }
  holdButton.addEventListener("pointerdown", startHold);
  holdButton.addEventListener("pointerup", stopHold);
  holdButton.addEventListener("pointercancel", stopHold);
  holdButton.addEventListener("keydown", startHold);
  holdButton.addEventListener("keyup", stopHold);

  let quantity = 1;
  const quantityOutput = document.getElementById("quantity");
  document.getElementById("minus").addEventListener("click", () => {
    quantity = Math.max(1, quantity - 1);
    quantityOutput.value = String(quantity);
    quantityOutput.textContent = String(quantity);
  });
  document.getElementById("plus").addEventListener("click", () => {
    quantity = Math.min(6, quantity + 1);
    quantityOutput.value = String(quantity);
    quantityOutput.textContent = String(quantity);
  });
  document.getElementById("orderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const grind = document.getElementById("grind").value.toLowerCase();
    document.getElementById("orderStatus").textContent =
      "Demo bag added: " +
      quantity +
      " × " +
      grind +
      ". Checkout is not connected.";
  });

  document.addEventListener("visibilitychange", () =>
    body.classList.toggle("paused", document.hidden),
  );
  addEventListener(
    "scroll",
    () => {
      if (pageRaf === null) pageRaf = requestAnimationFrame(updatePageEffects);
    },
    { passive: true },
  );
  addEventListener(
    "resize",
    () => {
      updatePageEffects();
      if (scrubOn) onScroll();
    },
    { passive: true },
  );
  addEventListener("beforeunload", () => {
    if (blobUrl) URL.revokeObjectURL(blobUrl);
  });

  if (reduceQuery.matches) pinToFinalStates();
  applyHeroMode();
  updatePageEffects();
  requestAnimationFrame(() => body.classList.add("ready"));
})();
