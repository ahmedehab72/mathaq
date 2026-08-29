"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/shared/components/ui/button";

export function AdminLoginForm() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <form className="mt-10 grid gap-4" onSubmit={handleSubmit}><label className="field-label">Studio email<input className="field-input" type="email" placeholder="studio@mathaq.coffee" required /></label><label className="field-label">Password<input className="field-input" type="password" placeholder="••••••••" required /></label><Button type="submit" size="lg" className="mt-4 w-full">{submitted ? <Check className="size-4" /> : <ArrowRight className="size-4" />}{submitted ? "Preview access granted" : "Enter studio"}</Button>{submitted && <p className="text-xs leading-5 text-[var(--mist)]" role="status">Admin role checks will be connected in the backend phase.</p>}</form>;
}
