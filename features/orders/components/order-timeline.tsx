import { Check } from "lucide-react";
import { orderSteps } from "@/features/orders/services/order-preview";

export function OrderTimeline() {
  return <div className="order-timeline">{orderSteps.map((step, index) => <div className="order-timeline-step" key={step.label}><div className="order-timeline-marker"><Check className="size-3.5" /></div><div className="min-w-0"><div className="flex flex-wrap items-center justify-between gap-3"><h3>{step.label}</h3><time>{step.date}</time></div><p>{step.copy}</p></div>{index < orderSteps.length - 1 && <span className="order-timeline-line" aria-hidden="true" />}</div>)}</div>;
}
