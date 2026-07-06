import { client } from '@/lib/sanityClient'

const query = '*[_type == "aboutPage"][0]{companyBio, ceoName, ceoBio, ceoImage, awards[]{title,year,image}, cacCertificateImage}'

export default async function AboutPage() {
  const data = await client.fetch(query)

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">About Kamzybee Global Enterprise</h1>
        <section className="mt-8 space-y-6">
          <div className="prose max-w-none">{data?.companyBio && <PortableText value={data.companyBio} />}</div>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">Our Mission & Values</h2>
            <div className="mt-4 prose max-w-none">{data?.companyBio && <PortableText value={data.companyBio} />}</div>
          </div>

          <aside>
            <h3 className="text-xl font-semibold">Leadership</h3>
            <p className="mt-2 font-medium">{data?.ceoName ?? 'Kamaldeen Adeshina Oyewumi, PHF, FIEPA'}</p>
            <p className="mt-1 text-sm text-slate-500">Chief Executive Officer, Kamzybee Global Enterprise | Rotaract Leader | Entrepreneur | Business Strategist | Community Development Advocate</p>
            <div className="mt-3 prose">{data?.ceoBio && <PortableText value={data.ceoBio} />}</div>
          </aside>
        </section>

        <section className="mt-12 rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">CEO Profile</h2>
          <div className="mt-6 space-y-4 text-slate-700">
            <p>
              Kamaldeen Oyewumi, popularly known as KamzyBee, is a visionary entrepreneur, transformational Rotaract leader, business strategist and passionate advocate for youth empowerment, peacebuilding and sustainable development.
            </p>
            <p>
              As the Chief Executive Officer of Kamzybee Global Enterprise, Kamaldeen provides strategic direction for an enterprise committed to delivering quality products and innovative business solutions while maintaining the highest standards of professionalism, integrity and customer satisfaction.
            </p>
            <p>
              Within the global Rotaract movement, his leadership is recognized across Nigeria and beyond. He served as President of the Rotaract Nigeria Multi-District Information Organization (RN-MDIO) for the 2025–2026 Rotary Year, where he promoted national unity, strengthened collaboration, and inspired institutional advancement.
            </p>
            <p>
              Kamaldeen also serves as a Learning Facilitator for Rotaract Region 22, contributing to leadership development, capacity building and knowledge transfer across the region. His Rotaract journey includes leadership roles such as Regional Learning Facilitator, Chairman of the All Nigeria Multi-District Conference, State Rotaract Representative, and President of the Rotaract Club of University of Ilorin.
            </p>
            <p>
              Beyond Rotaract, he is the Pioneer President of AutoFest International, where he helped build the Ilorin Automotive Festival into a landmark event for automotive innovation, entrepreneurship and economic development.
            </p>
            <p>
              A Fellow of the Ecolerite Institute for Peace Advancement (FEIPA), Kamaldeen remains committed to promoting peace, dialogue, conflict resolution and social cohesion, with aspirations to become a Rotary Peace Fellow.
            </p>
            <p>
              His professional strengths include strategic leadership, mentoring, project management, stakeholder engagement and business development. Through Kamzybee Global Enterprise, he continues to inspire a new generation of leaders to dream boldly, serve selflessly and lead with purpose.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Certifications & Awards</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {data?.awards?.map((a: any, idx: number) => (
              <div key={idx} className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="font-semibold">{a.title} <span className="text-sm text-slate-500">{a.year}</span></p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function PortableText({ value }: { value: any }) {
  // Minimal Portable Text rendering to avoid adding dependencies.
  if (!value) return null
  return (
    <div>
      {value.map((block: any, i: number) => (
        <p key={i}>{block.children?.map((c: any) => c.text).join('')}</p>
      ))}
    </div>
  )
}
