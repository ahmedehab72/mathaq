"use client";

import { cn } from "@/shared/lib/utils";
import { ResponsiveContainer, Tooltip } from "recharts";

export function ChartContainer({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-[16rem] w-full text-xs", className)} {...props}><ResponsiveContainer width="100%" height="100%">{children as React.ReactElement}</ResponsiveContainer></div>;
}

export function ChartTooltip({ ...props }: React.ComponentProps<typeof Tooltip>) {
  return <Tooltip cursor={{ stroke: "rgba(197,107,72,.25)" }} content={<ChartTooltipContent />} {...props} />;
}

export function ChartTooltipContent({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: string | number; color?: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return <div className="rounded-xl border border-[var(--line-strong)] bg-[#102b24] px-3 py-2 shadow-xl"><p className="mb-1 text-[var(--mist)]">{label}</p>{payload.map((item) => <p className="text-[var(--oat)]" key={item.name}>{item.name}: {item.value}</p>)}</div>;
}
