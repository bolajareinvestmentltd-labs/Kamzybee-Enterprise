import Link from 'next/link'

const categories = [
  {
    title: 'Smartphones',
    description: 'Verified handsets in stock with fast delivery estimates and condition details.',
  },
  {
    title: 'Laptops',
    description: 'Business-class devices, premium brands, and value-ready configurations.',
  },
  {
    title: 'Accessories',
    description: 'Chargers, cases, and power essentials to complete every purchase.',
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <section className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              KamzyBee Global Enterprise
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Premium tech inventory, live pricing, and instant product access.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Browse phones, laptops, and accessories with real-time stock status, secure Supabase auth, and a polished dashboard designed for fast decisions.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Browse Inventory
              </Link>
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore products
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.3),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.25),_transparent_35%)]" />
            <div className="relative grid gap-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Live product showcase</p>
                <h2 className="text-3xl font-bold">Elegant inventory motion for modern buyers.</h2>
                <p className="text-slate-300">
                  A dynamic experience that highlights key product categories with smooth animation and polished detail cards.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Phones</p>
                  <p className="mt-3 text-xl font-semibold">Top models, verified stock</p>
                  <p className="mt-2 text-sm text-slate-300">Search by brand, condition, and availability in one place.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/15">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Laptops</p>
                  <p className="mt-3 text-xl font-semibold">Business-ready inventory</p>
                  <p className="mt-2 text-sm text-slate-300">Quality laptops with pricing and stock details at a glance.</p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-800/70 p-6">
                <div className="absolute top-4 right-4 h-24 w-24 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative space-y-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Animated product deck</p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center shadow-xl transition hover:-translate-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Phone</p>
                      <p className="mt-2 text-lg font-semibold">Galaxy</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center shadow-xl transition hover:-translate-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Laptop</p>
                      <p className="mt-2 text-lg font-semibold">ThinkPad</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-center shadow-xl transition hover:-translate-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Accessory</p>
                      <p className="mt-2 text-lg font-semibold">Charger</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-3">
          {categories.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <p className="text-sm uppercase tracking-[0.28em] text-blue-600">{item.title}</p>
              <p className="mt-4 text-xl font-semibold text-slate-900">{item.title}</p>
              <p className="mt-3 text-slate-600">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-20 rounded-[2rem] bg-slate-950 px-8 py-12 text-white shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Why choose KamzyBee</p>
              <h2 className="mt-4 text-3xl font-bold">One source for inventory and secure user access</h2>
              <p className="mt-4 max-w-2xl text-slate-300">
                Our platform is built to keep product stock clean, authenticated, and easy to manage. Inventory is powered by KGE.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-900/90 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Secure auth</p>
                <p className="mt-3 text-lg font-semibold">Login and signup powered by Supabase</p>
              </div>
              <div className="rounded-3xl bg-slate-900/90 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Inventory control</p>
                <p className="mt-3 text-lg font-semibold">Live stock status, pricing, and category browsing</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-white p-10 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Need a fast content workflow?</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">Sanity Studio is still useful for editors</h2>
              <p className="mt-4 text-slate-600">
                If you want a dedicated content editor for product pages, descriptions, and image assets, Sanity Studio gives you a polished CMS interface. It’s ideal when non-technical users need to manage rich content without touching the database directly.
              </p>
            </div>
            <div className="space-y-4 rounded-[1.5rem] bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">Sanity Studio features</p>
              <ul className="space-y-3 text-slate-600">
                <li>• Structured content editing for products and page copy</li>
                <li>• Image uploads with media library support</li>
                <li>• Custom document types and field validation</li>
                <li>• Version history and real-time collaboration</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
