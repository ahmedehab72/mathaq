import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-orbit" aria-hidden="true">
        <span className="auth-orbit-ring auth-orbit-ring-one" />
        <span className="auth-orbit-ring auth-orbit-ring-two" />
        <span className="auth-orbit-core" />
        <span className="auth-orbit-label">A QUIETER WAY IN</span>
      </div>
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-heading">
          <p className="eyebrow">MATHAQ account</p>
          <h1 id="login-title">Welcome back.</h1>
        </div>
        <LoginForm />
      </section>
    </div>
  );
}
