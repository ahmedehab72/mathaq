import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = { title: "Account preview" };

export default function AccountPage() {
  return (
    <div className="page-shell">
      <section className="page-hero min-h-[52svh]">
        <div><p className="eyebrow">Account preview</p><h1 className="page-title mt-5">Your shelf remembers.</h1><p className="page-lede mt-7">Orders, saved recipes, and the coffees you want to meet again. Authentication will be connected with the backend phase.</p></div>
      </section>
      <section className="section-wrap">
        <Tabs defaultValue="orders">
          <TabsList aria-label="Account sections">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="brews">Saved brews</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <div className="panel rounded-3xl p-6 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div><p className="eyebrow">Demo order #MTH-1042</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.06em]">Morning No. 01</h2><p className="mt-3 text-[var(--mist)]">250 g, whole bean, roasted 18 Aug 2026</p></div>
                <span className="rounded-full border border-[rgba(197,107,72,.4)] bg-[rgba(197,107,72,.1)] px-3 py-2 text-xs">Delivered</span>
              </div>
              <Button variant="outline" className="mt-7">Reorder this morning</Button>
            </div>
          </TabsContent>
          <TabsContent value="brews">
            <div className="panel rounded-3xl p-8"><p className="eyebrow">Saved recipe</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.05em]">Soft V60, 18 g</h2><p className="mt-3 text-[var(--mist)]">288 g water, medium fine, 2:45</p></div>
          </TabsContent>
          <TabsContent value="profile">
            <div className="panel max-w-2xl rounded-3xl p-6 md:p-9"><div className="form-grid"><label className="field-label">Name<input className="field-input" defaultValue="MATHAQ guest" /></label><label className="field-label">Email<input className="field-input" type="email" placeholder="you@example.com" /></label><Button className="mt-3 w-fit">Save demo profile</Button></div></div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
