"use client"

import { FormEvent, useState } from 'react'
import Link from 'next/link'

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Services', href: '/about' },
  { label: 'Shop', href: '/inventory' },
  { label: 'Brands', href: '/inventory' },
  { label: 'Blog', href: '/about' },
  { label: 'Careers', href: '/about' },
]

const supportLinks = [
  { label: 'Help Center', href: '/contact' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/contact' },
  { label: 'Shipping Information', href: '/contact' },
  { label: 'Track Order', href: '/inventory' },
  { label: 'Returns & Refunds', href: '/contact' },
  { label: 'Warranty Policy', href: '/contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
]

const resourceLinks = [
  { label: 'Buying Guide', href: '/about' },
  { label: 'Device Care Tips', href: '/about' },
  { label: 'Promotions', href: '/inventory' },
  { label: 'Affiliate Program', href: '/about' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'f' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'i' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 't' },
  { label: 'X (Twitter)', href: 'https://twitter.com', icon: 'x' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'y' },
]

const trustBadges = [
  'Secure Payments',
  'Nationwide Delivery',
  'Original Products',
  'Warranty Available',
  'Trusted Business',
  'Customer Satisfaction',
]

const paymentMethods = ['Visa', 'Mastercard', 'Verve', 'Bank Transfer', 'Opay', 'Moniepoint']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const year = 2026

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) {
      setStatus('Please enter a valid email address.')
      return
    }

    setStatus('Thank you for subscribing!')
    setEmail('')
  }

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC]">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 xl:grid-cols-[1.5fr_1fr]">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-2">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Company</p>
              <ul className="space-y-3 text-sm text-[#E5E7EB]">
                {companyLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Customer Support</p>
              <ul className="space-y-3 text-sm text-[#E5E7EB]">
                {supportLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Legal</p>
              <ul className="space-y-3 text-sm text-[#E5E7EB]">
                {legalLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Resources</p>
              <ul className="space-y-3 text-sm text-[#E5E7EB]">
                {resourceLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-1 xl:justify-items-end">
            <div className="space-y-5 rounded-3xl border border-[#334155] bg-[#111827]/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Contact Information</p>
              <div className="space-y-3 text-sm text-[#E5E7EB]">
                <p>
                  <span className="font-semibold text-white">Phone:</span> +234 810 318 7673
                </p>
                <p>
                  <span className="font-semibold text-white">WhatsApp:</span> +234 810 318 7673
                </p>
                <p>
                  <span className="font-semibold text-white">Email:</span> info@kamzybee.com
                </p>
                <p>
                  <span className="font-semibold text-white">Address:</span> 12 Olonode Street, Ikeja, Lagos, Nigeria
                </p>
                <p>
                  <span className="font-semibold text-white">Hours:</span> Mon - Sat: 9am - 7pm
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#334155] bg-[#111827]/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Follow Us</p>
              <div className="mt-4 grid gap-3 text-sm text-[#E5E7EB] sm:grid-cols-2">
                {socialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-2xl border border-[#334155] bg-[#0F172A]/60 px-4 py-3 transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">
                      {item.icon.toUpperCase()}
                    </span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#334155] bg-[#111827]/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">Stay Updated</p>
              <p className="mt-3 text-sm leading-relaxed text-[#E5E7EB]">
                Subscribe to receive exclusive offers, product launches, discounts, and technology updates.
              </p>
              <form onSubmit={handleSubscribe} className="mt-5 flex flex-col gap-3">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-[#475569] bg-[#0F172A] px-4 py-3 text-sm text-white placeholder:text-[#94A3B8] focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-[#f0c95b]"
                >
                  Subscribe
                </button>
                {status && <p className="text-sm text-[#E5E7EB]">{status}</p>}
              </form>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-[#334155] bg-[#111827]/80 p-6">
          <div className="grid gap-4 xl:grid-cols-2 xl:items-center">
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge}
                  className="rounded-2xl border border-[#475569] bg-[#0F172A]/70 px-4 py-3 text-sm text-[#E5E7EB] shadow-sm transition hover:border-[#D4AF37] hover:bg-[#111827]"
                >
                  {badge}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#475569] bg-[#0F172A]/70 px-4 py-4 text-sm text-[#E5E7EB]">
              {paymentMethods.map((payment) => (
                <div key={payment} className="rounded-full bg-[#111827]/90 px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#E5E7EB]">
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#334155] pt-8 text-sm text-[#94A3B8] sm:flex-row">
          <p className="text-center text-[#E5E7EB]">
            © {year} Kamzybee Global Enterprise. All rights reserved. Built with premium service and integrity.
          </p>
          <button
            type="button"
            onClick={handleBackToTop}
            className="rounded-full border border-[#475569] bg-[#0F172A]/80 px-5 py-2 text-sm text-[#D4AF37] transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            Back to Top
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBackToTop}
        aria-label="Scroll back to top"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-900 shadow-xl transition hover:-translate-y-1 hover:bg-white dark:border-slate-600 dark:bg-slate-900/95 dark:text-slate-100 sm:bottom-8 sm:right-8"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V6" />
          <path d="M5 13l7-7 7 7" />
        </svg>
      </button>
    </footer>
  )
}
