import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      aria-hidden="true"
      className={cn("size-9", className)}
      fill="none"
    >
      <path
        d="M9 15h22v10c0 6.1-4.9 11-11 11S9 31.1 9 25V15Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M31 18h2.2a4.8 4.8 0 0 1 0 9.6H31M14 8c-2 2.7 2 4.4 0 7.2M22 6c-2.6 3.4 2.7 5.1.1 8.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
