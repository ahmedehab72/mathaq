import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-[-0.01em] transition-[transform,background-color,color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] disabled:pointer-events-none disabled:opacity-45 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--clay)] text-[var(--canvas)] hover:-translate-y-0.5 hover:bg-[#d47a56]",
        outline:
          "border border-[var(--line-strong)] bg-transparent text-[var(--oat)] hover:border-[var(--oat)] hover:bg-white/5",
        ghost: "text-[var(--oat)] hover:bg-white/7",
      },
      size: {
        default: "h-11",
        lg: "h-13 px-7 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
