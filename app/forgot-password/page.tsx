import type { Metadata } from "next";
import { AuthPreviewForm } from "@/features/auth/components/auth-preview-form";
import { authCopy } from "@/features/auth/lib/auth-copy";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  const content = authCopy.forgot;
  return <div className="auth-page"><div className="auth-orbit" aria-hidden="true"><span className="auth-orbit-ring auth-orbit-ring-one" /><span className="auth-orbit-ring auth-orbit-ring-two" /><span className="auth-orbit-core" /></div><section className="auth-card" aria-labelledby="forgot-title"><div className="auth-heading"><p className="eyebrow">{content.eyebrow}</p><h1 id="forgot-title">{content.title}</h1><p>{content.description}</p></div><AuthPreviewForm mode="forgot" /></section></div>;
}
