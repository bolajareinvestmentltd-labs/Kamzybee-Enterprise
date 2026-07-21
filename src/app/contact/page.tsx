export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0B3D91]">Contact</p>
          <h1 className="text-4xl font-bold text-[var(--foreground)]">Let’s help you source the right device faster.</h1>
          <p className="text-lg text-[var(--text-light)]">
            Reach KamzyBee for bulk orders, product questions, technical support, or enterprise procurement needs.
          </p>

          <div className="grid gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Phone</p>
              <p className="mt-2 text-base text-[var(--foreground)]">+234 803 000 0000</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Email</p>
              <p className="mt-2 text-base text-[var(--foreground)]">info@kamzybee.com</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">Office</p>
              <p className="mt-2 text-base text-[var(--foreground)]">12 Olonode Street, Ikeja, Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <form className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">Full Name</label>
              <input className="w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">Email</label>
              <input className="w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">Message</label>
              <textarea className="min-h-36 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3" placeholder="Tell us about your request" />
            </div>
            <button type="button" className="inline-flex rounded-full bg-[#0B3D91] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0A3078]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
