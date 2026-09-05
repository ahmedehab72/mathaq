import Link from "next/link";
import { AdminOrderDetail } from "@/features/admin/components/admin-order-detail";
export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <AdminOrderDetail id={id} />; }
