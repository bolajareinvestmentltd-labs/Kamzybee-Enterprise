import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
              KamzyBee Enterprise
            </p>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
              A modern inventory experience for product teams.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              Browse stock across categories and brands, inspect product details, and view inventory status in a clean, responsive Next.js app powered by Sanity.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/inventory"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Browse Inventory
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Learn more
              </Link>
            </div>
          </section>

          <section className="relative isolate overflow-hidden rounded-3xl bg-white px-6 py-10 shadow-xl ring-1 ring-slate-200 sm:px-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 opacity-80" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Inventory snapshot
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Real-time stock</p>
                  <p className="mt-4 text-3xl font-semibold">Fast browsing</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Search and filter products by brand, category, or condition for faster decision making.
                  </p>
                </div>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Project setup</p>
                  <p className="mt-4 text-3xl font-semibold text-slate-900">Next.js App Router</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Built with modern Next.js routing, secure API fetches, and Sanity-backed product data.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
