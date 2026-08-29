"use client";

import Link from "next/link";
import { ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/shared/components/ui/button";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="field-label">
        Email
        <input className="field-input" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>
      <label className="field-label">
        <span className="auth-field-heading">
          <span>Password</span>
          <Link href="/forgot-password">Forgot password?</Link>
        </span>
        <span className="auth-password-field">
          <input className="field-input" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" required />
          <button type="button" className="auth-password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </span>
      </label>
      <Button type="submit" size="lg" className="auth-submit">
        {submitted ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
        {submitted ? "Preview sign in complete" : "Enter your shelf"}
      </Button>
      {submitted && <p className="auth-status" role="status">This is a design preview. Your account connection will be added with Supabase.</p>}
      <p className="auth-switch">
        New here? <Link href="/register">Create account <ArrowRight className="size-3.5" /></Link>
      </p>
    </form>
  );
}
