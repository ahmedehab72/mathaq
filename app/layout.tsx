import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { AmbientLayer } from "@/shared/components/ambient-layer";
import { SiteFooter } from "@/shared/components/site-footer";
import { SiteHeader } from "@/shared/components/site-header";
import { Providers } from "@/shared/providers/providers";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: { default: "MATHAQ Coffee", template: "%s | MATHAQ" },
  description:
    "Enter a quieter coffee ritual. Traceable coffees, clear flavor, and a calm way to choose your morning.",
};

export const viewport: Viewport = { themeColor: "#071713" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Providers>
          <AmbientLayer />
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
