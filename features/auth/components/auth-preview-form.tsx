"use client";

import Link from "next/link";
import { ArrowRight, Check, Eye, EyeOff, Mail, RotateCcw } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import type { AuthMode } from "@/features/auth/lib/auth-copy";

export function AuthPreviewForm({ mode }: { mode: AuthMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-12 grid gap-5 rounded-2xl bg-[rgba(197,107,72,.08)] p-6 text-center ring-1 ring-[rgba(197,107,72,.25)]">
        <Check className="mx-auto size-8 text-[var(--clay)]" />
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-[-.05em]">Preview complete.</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--mist)]">The real account connection will be added with Supabase.</p>
        </div>
        <Button variant="outline" onClick={() => setSubmitted(false)}><RotateCcw className="size-4" />Return</Button>
      </div>
    );
  }

  return (
    <form className="mt-10 grid gap-4" onSubmit={handleSubmit}>
      {mode === "register" && <label className="field-label">Name<input className="field-input" name="name" autoComplete="name" placeholder="Your name" required /></label>}
      <label className="field-label">Email<input className="field-input" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
      {mode !== "forgot" && <label className="field-label">{mode === "reset" ? "New password" : "Password"}<span className="auth-password-field"><input className="field-input" name="password" type={showPassword ? "text" : "password"} autoComplete={mode === "reset" ? "new-password" : "new-password"} placeholder="At least 8 characters" minLength={8} required /><button type="button" className="auth-password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></span></label>}
      {mode === "register" && <label className="flex items-start gap-3 text-xs leading-5 text-[var(--mist)]"><input className="mt-1 size-4 accent-[var(--clay)]" type="checkbox" required />I agree to the <Link className="text-[var(--oat)] underline underline-offset-4" href="/terms">terms</Link>.</label>}
      <Button type="submit" size="lg" className="mt-3 w-full">{mode === "register" ? "Create account" : mode === "forgot" ? <><Mail className="size-4" />Send reset link</> : "Set new password"}<ArrowRight className="size-4" /></Button>
      <p className="text-center text-xs text-[var(--mist)]">{mode === "register" ? <>Already have an account? <Link className="text-[var(--oat)]" href="/login">Sign in</Link></> : mode === "forgot" ? <>Remembered it? <Link className="text-[var(--oat)]" href="/login">Back to sign in</Link></> : <>Password changed? <Link className="text-[var(--oat)]" href="/login">Sign in</Link></>}</p>
    </form>
  );
}
