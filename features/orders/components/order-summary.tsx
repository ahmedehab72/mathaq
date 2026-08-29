import { MapPin, PackageCheck } from "lucide-react";
import { previewOrder } from "@/features/orders/services/order-preview";
import { formatMoney } from "@/shared/lib/utils";

export function OrderSummary({ compact = false }: { compact?: boolean }) {
  return <div className="grid gap-6"><div className="order-items">{previewOrder.items.map((item) => <div className="order-item" key={item.name}><div className="order-item-number">0{item.quantity}</div><div className="min-w-0 flex-1"><strong>{item.name}</strong><span>{item.detail}</span></div><strong>{formatMoney(item.price * item.quantity)}</strong></div>)}</div>{!compact && <><div className="order-address"><div className="flex items-center gap-3"><MapPin className="size-4 text-[var(--clay)]" /><p className="eyebrow">Sent to</p></div><p className="mt-3">{previewOrder.address[0]}<br />{previewOrder.address[1]}</p></div><div className="order-totals"><div><span>Subtotal</span><strong>{formatMoney(previewOrder.subtotal)}</strong></div><div><span>Shipping</span><strong>Free</strong></div><div className="order-total"><span>Total</span><strong>{formatMoney(previewOrder.total)}</strong></div></div></>}{compact && <div className="flex items-center gap-2 text-xs text-[var(--mist)]"><PackageCheck className="size-4 text-[var(--clay)]" />Delivered to Cairo, Egypt</div>}</div>;
}
