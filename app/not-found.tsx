import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <div className="not-found-page"><span className="not-found-number">404</span><h1>That page wandered off.</h1><p>The cup is still here. The page is not.</p><Link href="/" className="text-link"><ArrowLeft className="size-4" />Return home</Link></div>; }
