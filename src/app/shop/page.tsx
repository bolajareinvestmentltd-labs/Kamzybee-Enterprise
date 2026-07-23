import InventoryPage from '../inventory/page'
import Link from 'next/link'

const categories = [
  'Smartphones',
  'Laptops',
  'Accessories',
  'Business Solutions',
  'Wearables',
]

export default function ShopPage() {
  return (
    <main className="bg-[#F8F9FA] text-[#0F172A]">
      <section className="relative overflow-hidden bg-white py-14 sm:py-20">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F4B400]/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0B3D91]">Shop</p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
                Premium devices and member-only savings, all in one polished shop.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[#475569]">
                Browse the latest inventory for Rotary members, filter by category, and discover gear built for modern work and travel.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#inventory-list"
                  className="rounded-full bg-[#0B3D91] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0B3D91]/10 transition hover:bg-[#0A3078]"
                >
                  Browse Catalog
                </Link>
                <Link
                  href="/auth"
                  className="rounded-full border border-[#0B3D91] px-6 py-3 text-sm font-semibold text-[#0B3D91] transition hover:bg-[#EFF6FF]"
                >
                  Verify Membership
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#E5E7EB] bg-[#F8FAFC] p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4 rounded-[1.75rem] bg-white p-6 shadow-sm">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0B3D91]">Member Deal</p>
                  <p className="mt-3 text-3xl font-bold text-[#0F172A]">20% OFF</p>
                </div>
                <span className="inline-flex rounded-full bg-[#F4B400] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F172A]">
                  Rotary / Rotaract
                </span>
              </div>
              <div className="mt-6 grid gap-4 text-sm text-[#475569]">
                <div className="rounded-[1.5rem] bg-[#EFF6FF] p-4">
                  <p className="font-semibold text-[#0B3D91]">Fast verification</p>
                  <p className="mt-2">Verify once and unlock member savings on every purchase.</p>
                </div>
                <div className="rounded-[1.5rem] bg-[#EFF6FF] p-4">
                  <p className="font-semibold text-[#0B3D91]">Top brands</p>
                  <p className="mt-2">Explore curated devices, laptops, accessories, and wearables.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[2rem] bg-[#0B3D91] p-6 text-white shadow-lg sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map((label) => (
                <div key={label} className="rounded-3xl bg-white/10 px-4 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="inventory-list" className="relative py-12">
        <InventoryPage />
      </section>
    </main>
  )
}
