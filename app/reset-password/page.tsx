import type { Metadata } from "next";
import { AuthPreviewForm } from "@/features/auth/components/auth-preview-form";
import { authCopy } from "@/features/auth/lib/auth-copy";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  const content = authCopy.reset;
  return <div className="auth-page"><div className="auth-orbit" aria-hidden="true"><span className="auth-orbit-ring auth-orbit-ring-one" /><span className="auth-orbit-ring auth-orbit-ring-two" /><span className="auth-orbit-core" /></div><section className="auth-card" aria-labelledby="reset-title"><div className="auth-heading"><p className="eyebrow">{content.eyebrow}</p><h1 id="reset-title">{content.title}</h1><p>{content.description}</p></div><AuthPreviewForm mode="reset" /></section></div>;
}
