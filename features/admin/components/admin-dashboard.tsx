"use client";

import {
  LogOut,
  PackagePlus,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminStore } from "@/features/admin/stores/admin-store";
import { Button } from "@/shared/components/ui/button";
import { formatMoney } from "@/shared/lib/utils";
import { AdminProductModal } from "@/features/admin/components/admin-product-modal";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { CartesianGrid, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/shared/components/ui/chart";

export function AdminDashboard() {
  const [active, setActive] = useState("Overview");
  const [revenuePeriod, setRevenuePeriod] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [notice, setNotice] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const orders = useAdminStore((state) => state.orders);
  const catalog = useAdminStore((state) => state.products);
  const isAdmin = useAdminStore((state) => state.isAdmin);
  const setAdmin = useAdminStore((state) => state.setAdmin);
  const router = useRouter();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const revenueData = { daily: [{ day: "08:00", value: 18 }, { day: "10:00", value: 32 }, { day: "12:00", value: 24 }, { day: "14:00", value: 46 }, { day: "16:00", value: 38 }, { day: "18:00", value: 52 }], weekly: [{ day: "Mon", value: 42 }, { day: "Tue", value: 64 }, { day: "Wed", value: 50 }, { day: "Thu", value: 78 }, { day: "Fri", value: 58 }, { day: "Sat", value: 86 }, { day: "Sun", value: 72 }], monthly: [{ day: "Week 1", value: 190 }, { day: "Week 2", value: 260 }, { day: "Week 3", value: 220 }, { day: "Week 4", value: 340 }] };
  const chartData = revenueData[revenuePeriod];
  const orderMix = [{ name: "Pending", value: orders.filter((order) => order.status === "Pending").length }, { name: "Processing", value: orders.filter((order) => order.status === "Processing").length }, { name: "Completed", value: orders.filter((order) => ["Delivered", "Shipped"].includes(order.status)).length }, { name: "Other", value: orders.filter((order) => ["Cancelled", "Refunded"].includes(order.status)).length }].filter((item) => item.value > 0);

  return (
    <div className="admin-shell">
      <AdminSidebar active={active} />
      {/*
        <p className="eyebrow mb-5">MATHAQ studio</p>
        <nav className="admin-nav" aria-label="Admin preview navigation">
          {nav.map(([label, Icon, href]) => (
            <Link
              key={label}
              href={href}
              className={active === label ? "active" : ""}
              onClick={() => setActive(label)}
            >
              <span className="inline-flex items-center gap-2">
                <Icon className="size-4" />
                {label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>*/}
      <section className="admin-content">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Design preview</p>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-[-.07em]">
              {active}
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="admin-user-badge">
              {isAdmin ? "Admin signed in" : "Preview mode"}
            </span>
            <Button
              variant="outline"
              onClick={() => {
                setAdmin(false);
                router.push("/admin/login");
              }}
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
            <Button onClick={() => setShowProductModal(true)}>
              <PackagePlus className="size-4" />
              Add product
            </Button>
          </div>
        </div>
        {notice && (
          <p
            role="status"
            className="mt-5 rounded-xl border border-[rgba(197,107,72,.4)] bg-[rgba(197,107,72,.08)] p-4 text-sm text-[var(--mist)]"
          >
            {notice}
          </p>
        )}
        <div className="metric-grid mt-10">
          {[
            ["Demo revenue", formatMoney(revenue)],
            ["Orders", String(orders.length)],
            [
              "Pending",
              String(
                orders.filter((order) => order.status === "Pending").length,
              ),
            ],
          ].map(([label, value]) => (
            <article className="metric-card" key={label}>
              <span className="eyebrow">{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
        <div id="analytics" className="admin-insight-grid mt-8">
          <article className="admin-chart-card">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold tracking-[-.055em]">
                Weekly rhythm
              </h2>
              <div className="flex flex-wrap items-center gap-2"><span className="font-mono text-xs text-[var(--mist)]">Demo analytics</span><div className="admin-chart-filter" aria-label="Revenue chart period">{(["daily", "weekly", "monthly"] as const).map((period) => <button type="button" key={period} className={revenuePeriod === period ? "active" : ""} onClick={() => setRevenuePeriod(period)} aria-pressed={revenuePeriod === period}>{period[0].toUpperCase() + period.slice(1)}</button>)}</div></div>
            </div>
            <ChartContainer aria-label={`Demo ${revenuePeriod} revenue line chart`}><LineChart data={chartData} margin={{ left: -20, right: 10 }}><CartesianGrid stroke="rgba(232,218,187,.12)" vertical={false} /><XAxis dataKey="day" stroke="var(--mist)" tickLine={false} axisLine={false} /><YAxis stroke="var(--mist)" tickLine={false} axisLine={false} width={36} /><ChartTooltip /><Line type="monotone" dataKey="value" name="Revenue" stroke="var(--clay)" strokeWidth={3} dot={{ fill: "var(--oat)", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "var(--oat)" }} /></LineChart></ChartContainer>
          </article>
          <article className="admin-chart-card"><div className="mb-5 flex items-center justify-between"><h2 className="font-display text-3xl font-semibold tracking-[-.055em]">Order mix</h2><span className="font-mono text-xs text-[var(--mist)]">Demo analytics</span></div><ChartContainer aria-label="Demo order status circle chart"><PieChart><ChartTooltip /><Pie data={orderMix.length ? orderMix : [{ name: "No orders", value: 1 }]} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={4} stroke="none">{(orderMix.length ? orderMix : [{ name: "No orders", value: 1 }]).map((item, index) => <Cell key={item.name} fill={["var(--clay)", "var(--oat)", "#6f9b83", "#8d4a36"][index % 4]} />)}</Pie></PieChart></ChartContainer><div className="flex flex-wrap gap-3 text-xs text-[var(--mist)]">{(orderMix.length ? orderMix : [{ name: "No orders", value: 0 }]).map((item, index) => <span key={item.name}><i className="mr-1 inline-block size-2 rounded-full" style={{ background: ["var(--clay)", "var(--oat)", "#6f9b83", "#8d4a36"][index % 4] }} />{item.name}: {item.value}</span>)}</div></article>
          <article className="admin-recent-card">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-3xl font-semibold tracking-[-.055em]">
                Recent orders
              </h2>
              <span className="font-mono text-xs text-[var(--mist)]">
                Live preview
              </span>
            </div>
            <div className="admin-mini-list">
              {orders.slice(0, 4).map((order) => (
                <Link href={`/admin/orders/${order.id}`} key={order.id}>
                  <span>
                    <strong>{order.id}</strong>
                    <small>{order.customer.name}</small>
                  </span>
                  <b>{formatMoney(order.total)}</b>
                </Link>
              ))}
            </div>
          </article>
        </div>
        <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[rgba(18,41,35,.45)] p-4 md:p-7">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-3xl font-semibold tracking-[-.055em]">
              Product table
            </h2>
            <span className="font-mono text-xs text-[var(--mist)]">
              Demo data
            </span>
          </div>
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Origin</th>
                  <th>Roast</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {catalog.map((product) => (
                  <tr key={product.slug}>
                    <td>
                      <strong>{product.name}</strong>
                    </td>
                    <td className="text-[var(--mist)]">{product.origin}</td>
                    <td>{product.roast}</td>
                    <td>{formatMoney(product.price)}</td>
                    <td>
                      <span
                        className={`admin-product-state ${product.published ? "published" : "hidden"}`}
                      >
                        {product.published ? "Published" : "Hidden"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {showProductModal && (
        <AdminProductModal onClose={() => setShowProductModal(false)} />
      )}
    </div>
  );
}
