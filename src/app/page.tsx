import Link from 'next/link'
import VideoHeroWrapper from '@/components/VideoHeroWrapper'

const featureCards = [
  {
    title: '100% Secure',
    description: 'Secure payment on all orders',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M12 3l7 3v5c0 4.2-2.6 7.8-7 10-4.4-2.2-7-5.8-7-10V6l7-3Z" />
        <path d="m9.5 12 1.8 1.8 3.2-3.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Fast Delivery',
    description: 'Quick delivery to your doorstep',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M3 7h11v8H3z" />
        <path d="M14 10h4l3 3v2h-7" />
        <circle cx="7.5" cy="17.5" r="1.5" />
        <circle cx="16.5" cy="17.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Best Quality',
    description: 'Quality products you can trust',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M12 4 5 7v5c0 4.2 2.8 7.6 7 9 4.2-1.4 7-4.8 7-9V7l-7-3Z" />
        <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: '24/7 Support',
    description: "We're here to help you anytime",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M5 7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3H10l-4 3v-3H5a3 3 0 0 1-3-3V7Z" />
      </svg>
    ),
  },
]

const categories = [
  {
    title: 'Phones & Tablets',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 text-gray-400 transition-colors group-hover:text-[#0B3D91]">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Laptops',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 text-gray-400 transition-colors group-hover:text-[#0B3D91]">
        <rect x="2" y="4" width="20" height="12" rx="2" />
        <path d="M2 16h20v2H2z" />
        <path d="M12 18v2" />
      </svg>
    ),
  },
  {
    title: 'Accessories',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 text-gray-400 transition-colors group-hover:text-[#0B3D91]">
        <path d="M3 14c0-4.97 4.03-9 9-9s9 4.03 9 9" />
        <rect x="2" y="14" width="4" height="6" rx="1" />
        <rect x="18" y="14" width="4" height="6" rx="1" />
      </svg>
    ),
  },
  {
    title: 'Smart Watches',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 text-gray-400 transition-colors group-hover:text-[#0B3D91]">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 2v3M12 19v3M9 12h6" />
        <rect x="9" y="5" width="6" height="14" rx="2" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    title: 'Fragrances',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 text-gray-400 transition-colors group-hover:text-[#0B3D91]">
        <rect x="6" y="8" width="12" height="14" rx="3" />
        <path d="M9 8V5a3 3 0 0 1 6 0v3" />
        <circle cx="12" cy="14" r="2" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F3F4F6] text-[#1F2937] antialiased">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-6">
        <section className="relative grid min-h-[420px] items-center gap-8 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#0B3D91] via-[#1a5bb8] to-[#0B3D91] p-8 text-white shadow-2xl md:p-12 lg:grid-cols-12 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,_rgba(244,180,0,0.15),_transparent_60%)] before:pointer-events-none">
          <div className="z-10 space-y-6 lg:col-span-6 animate-slide-up">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Quality Products.
              <br />
              <span className="text-[#F4B400]">Trusted by You.</span>
            </h1>
            <p className="max-w-md text-sm font-light text-gray-200 md:text-base">
              Shop the best products at unbeatable prices. Fast delivery. Secure payment. 100% satisfaction.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 [animation-delay:200ms]">
              <Link
                href="/inventory"
                className="rounded-md bg-[#F4B400] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-[#1F2937] shadow-md transition-all hover:bg-yellow-500"
              >
                Shop Now
              </Link>
              <Link
                href="/inventory"
                title="Latest update pushed to main"
                className="rounded-md border-2 border-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#0B3D91]"
              >
                Explore Deals
              </Link>
            </div>
            <div className="mt-6 inline-flex flex-col gap-3 rounded-full border border-white/20 bg-white/10 p-4 text-sm text-white shadow-2xl shadow-[#0B3D91]/25 backdrop-blur sm:flex-row sm:items-center sm:gap-4">
              <div className="inline-flex items-center gap-3 rounded-full bg-[#F4B400] px-3 py-2 text-[#0B3D91] shadow-inner shadow-[#F4B400]/30">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0B3D91] shadow-sm animate-spin-slow">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 2v4" strokeLinecap="round" />
                    <path d="M16 4.9 14.2 7.7" strokeLinecap="round" />
                    <path d="M20 12h-4" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="font-semibold uppercase tracking-[0.2em]">20% Rotary / Rotaract member savings</span>
              </div>
              <p className="max-w-xl text-sm text-[#E5E7EB]">
                Verified Rotary members get instant premium pricing on top brand devices and accessories.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg shadow-[#0B3D91]/30 transition md:hidden">
              <span className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F4B400] text-[#0B3D91] shadow-inner shadow-[#F4B400]/30 animate-spin-slow">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 2v4" strokeLinecap="round" />
                    <path d="M16 4.9 14.2 7.7" strokeLinecap="round" />
                  </svg>
                </span>
                20% Rotary Member Savings
              </span>
              <span className="text-[10px] text-[#E5E7EB]">Verified Rotary members get premium pricing</span>
            </div>
          </div>

          <div className="relative z-10 flex min-h-[300px] items-center justify-center lg:col-span-6 lg:h-full animate-fade-in [animation-delay:300ms]">
            <div className="absolute bottom-2 h-12 w-72 scale-y-50 skew-x-12 rounded-full bg-[#F4B400] opacity-80 blur-[3px] shadow-2xl md:w-96 animate-pulse-glow" />
            <div className="relative h-full w-full transform transition-transform duration-500 hover:scale-105">
              <VideoHeroWrapper />
            </div>
          </div>

          <div className="hidden md:flex absolute right-0 top-1/2 z-20 max-w-[180px] -translate-y-1/2 translate-x-4 flex-col items-center gap-2 rounded-l-3xl border-y-4 border-l-4 border-white/30 bg-gradient-to-b from-[#22C55E] to-[#16A34A] px-8 py-6 text-white shadow-2xl animate-slide-up hover:shadow-green-600/50 transition-shadow duration-300">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-dashed border-white animate-spin" style={{ animationDuration: '3s' }}>
              <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-2xl font-black leading-none tracking-tight animate-pulse">20% OFF</span>
            <span className="text-center text-[10px] font-semibold uppercase tracking-wider text-green-50">For Rotary/Rotaract Members</span>
          </div>

          <div className="absolute left-1/2 top-full z-20 mt-6 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 flex-col items-center gap-3 rounded-3xl border border-white/20 bg-gradient-to-r from-[#22C55E] to-[#16A34A] px-4 py-4 text-white shadow-2xl md:hidden">
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0B3D91] shadow-inner shadow-[#F4B400]/30 animate-spin-slow">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 1 0 10 10" />
                    <path d="M12 2v4" strokeLinecap="round" />
                    <path d="M16 4.9 14.2 7.7" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em]">20% OFF</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/80">Rotary / Rotaract members</p>
                </div>
              </div>
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white">Member</span>
            </div>
            <p className="text-center text-[11px] text-white/85">Verified Rotary members get instant premium pricing on top brand devices and accessories.</p>
          </div>
        </section>

        <section className="grid gap-6 rounded-xl border border-gray-100 bg-[#F8F9FA] p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((item) => (
            <div key={item.title} className="flex items-start gap-4 p-2">
              <div className="rounded-full bg-blue-100 p-3 text-[#0B3D91]">{item.icon}</div>
              <div>
                <h4 className="text-sm font-bold text-[#1F2937]">{item.title}</h4>
                <p className="mt-0.5 text-xs text-[#6B7280]">{item.description}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid gap-8 lg:grid-cols-12">
          <section className="space-y-6 lg:col-span-9">
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h2 className="text-lg font-bold uppercase tracking-wider text-[#1F2937]">Shop By Category</h2>
              <Link href="/inventory" className="flex items-center gap-1 text-sm font-semibold text-[#0B3D91] hover:opacity-80">
                View all <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {categories.map((item) => (
                <Link
                  key={item.title}
                  href={`/inventory?category=${encodeURIComponent(item.title)}`}
                  className="group"
                >
                  <div className="flex h-36 items-center justify-center rounded-xl border border-gray-100 bg-[#F8F9FA] p-6 shadow-sm transition-all group-hover:border-[#0B3D91]/30 group-hover:shadow">
                    {item.icon}
                  </div>
                  <p className="mt-3 text-center text-xs font-bold text-[#1F2937] transition-colors group-hover:text-[#0B3D91]">{item.title}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="flex h-full flex-col lg:col-span-3">
            <div className="mb-6 border-b border-gray-200 pb-3">
              <h2 className="text-lg font-bold uppercase tracking-wider text-[#1F2937]">Exclusive Discount</h2>
            </div>

            <div className="relative flex min-h-[300px] flex-1 flex-col items-center justify-between overflow-hidden rounded-[1.25rem] bg-[#0B3D91] p-6 text-center text-white shadow-md">
              <div className="absolute -bottom-12 -right-12 h-36 w-36 rounded-full border border-white/10" />
              <div className="z-10 flex flex-col items-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#F4B400] bg-[#F4B400]/20 p-2.5">
                  <svg className="h-full w-full text-[#F4B400]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-100">Are you a Rotary/Rotaract Member?</h3>
                <p className="max-w-[200px] text-xs font-light text-gray-300">
                  Enjoy 20% OFF on all products, every time you shop.
                </p>
              </div>

              <Link href="/auth" className="z-10 w-full rounded-lg bg-[#F4B400] py-3 text-xs font-bold uppercase tracking-wider text-[#1F2937] shadow transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg hover:scale-105">
                Verify Membership
              </Link>
            </div>
          </section>
        </div>

        <section className="grid gap-8 rounded-xl bg-[#0B3D91] px-6 py-8 text-white shadow-inner md:grid-cols-2 lg:grid-cols-4 md:px-10">
          {[
            ['Special Discount', '20% OFF for verified Rotary/Rotaract members'],
            ['Trusted Community', 'Proud to serve the Rotary family'],
            ['Service Above Self', 'Together, we make a difference'],
            ['Secure & Reliable', 'Your trust is our priority'],
          ].map(([title, description]) => (
            <div key={title} className="flex items-center gap-4 border-b border-white/10 pb-6 last:border-b-0 last:pb-0 md:border-b-0 md:border-r md:last:border-r-0 md:pr-4 md:pb-0 lg:last:border-r-0">
              <div className="text-[#F4B400]">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider">{title}</h5>
                <p className="mt-0.5 text-[11px] text-gray-300">{description}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
