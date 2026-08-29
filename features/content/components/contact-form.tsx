"use client";

import { Check, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/shared/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  if (sent) return <div className="contact-success"><Check className="size-7 text-[var(--clay)]" /><h2>Message received.</h2><p>This is a design preview. We will connect the inbox in the backend phase.</p></div>;
  return <form className="grid gap-5" onSubmit={submit}><div className="grid gap-5 md:grid-cols-2"><label className="field-label">Name<input className="field-input" required placeholder="Your name" /></label><label className="field-label">Email<input className="field-input" type="email" required placeholder="you@example.com" /></label></div><label className="field-label">Message<textarea className="field-input min-h-40 resize-y" required placeholder="Tell us what is on your mind..." /></label><Button type="submit" size="lg" className="w-fit"><Send className="size-4" />Send note</Button></form>;
}
