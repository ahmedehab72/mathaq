"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;

export function SheetContent({
  children,
  className,
  title = "Menu",
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in" />
      <Dialog.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-[min(92vw,420px)] border-l border-[var(--line)] bg-[var(--canvas-soft)] p-6 shadow-2xl outline-none data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 transition-transform duration-500",
          className,
        )}
      >
        <Dialog.Title className="sr-only">{title}</Dialog.Title>
        <Dialog.Close className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-[var(--line)] text-[var(--oat)] transition-colors hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)]">
          <X className="size-5" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
