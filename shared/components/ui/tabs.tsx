"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";
import { cn } from "@/shared/lib/utils";

export const Tabs = TabsPrimitive.Root;

export function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return <TabsPrimitive.List className={cn("inline-flex min-h-12 items-center gap-1 rounded-full border border-[var(--line)] bg-white/[.025] p-1", className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return <TabsPrimitive.Trigger className={cn("min-h-10 rounded-full px-4 text-sm text-[var(--mist)] transition-colors data-[state=active]:bg-[var(--clay)] data-[state=active]:text-[var(--canvas)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)]", className)} {...props} />;
}

export function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content className={cn("mt-8 outline-none", className)} {...props} />;
}
