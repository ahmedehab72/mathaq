import type { Metadata } from "next";
import { AdminDashboard } from "@/features/admin/components/admin-dashboard";

export const metadata: Metadata = { title: "Admin design preview" };

export default function AdminPage() {
  return <AdminDashboard />;
}
