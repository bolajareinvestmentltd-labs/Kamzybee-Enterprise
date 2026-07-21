import Image from 'next/image'
import { client } from '@/lib/sanityClient'

const query = '*[_type == "aboutPage"][0]{companyBio, ceoName, ceoBio, ceoImage, awards[]{title,year,image}, cacCertificateImage}'

const defaultAwards = [
  { title: 'NR-MDIO (Meritorious Service Award)', year: '2021/2022' },
  { title: 'NR-MDIO (Award of Appreciation)', year: '2024/2025' },
  { title: 'Al-Hikmah University (Philanthropic Leadership Awards)', year: 'N/A' },
  { title: 'Rotary Club of Ilorin GRA (Certificate of Appreciation)', year: '2024/2025' },
  { title: 'Rotaract District 9125 (Best Dressed Rotaractor)', year: '2015/2016' },
  { title: 'Rotaract Club of Ilorin GRA (Certificate of Appreciation)', year: '2023/2024' },
  { title: 'Zone J Rotaract District 9125 (Appreciation Award)', year: '2025/2025' },
  { title: 'Rotary Club of Ilorin GRA (Award of Excellence)', year: '2019/2020' },
  { title: 'Rotaract Club of Ilorin GRA (Certificate of Appreciation)', year: '2023/2024' },
  { title: 'Offa Youth Progressive Association (Humanitarian Service Award)', year: '2023' },
  { title: 'ONE (Certificate of Appreciation)', year: '2024' },
  { title: 'Oyo State, Rotaract District 9126 (Exceptional Leadership Award)', year: '2026' },
  { title: 'Ecolerite Institute for Peace Advancement (Fellow)', year: 'N/A' },
  { title: 'Paul Harris Fellow', year: 'N/A' },
]

function getAwardBadge(title: string) {
  return /certificate|cert/i.test(title) ? '/images/awards/certificate-badge.svg' : '/images/awards/award-badge.svg'
}

export default async function AboutPage() {
  let data = null
  try {
    data = await client.fetch(query)
  } catch (error) {
    console.warn('Sanity fetch error:', error)
    data = null
  }

  const ceoImageUrl = typeof data?.ceoImage?.asset?.url === 'string' && data.ceoImage.asset.url.length > 0
    ? data.ceoImage.asset.url
    : '/images/about/ceo-portrait.jpeg'
  const awardEntries = Array.isArray(data?.awards) && data.awards.length > 0 ? data.awards : defaultAwards
  const ceoIsRemote = /^https?:\/\//i.test(ceoImageUrl)

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">About Kamzybee Global Enterprise</h1>
        <section className="mt-8 space-y-6">
          <div className="prose max-w-none">{data?.companyBio && <PortableText value={data.companyBio} />}</div>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="overflow-hidden rounded-[1.5rem] shadow-sm">
              {ceoIsRemote ? (
                <img src={ceoImageUrl} alt="CEO portrait" className="h-96 w-full object-cover" />
              ) : (
                <Image src={ceoImageUrl} alt="CEO portrait" width={800} height={1000} className="h-96 w-full object-cover" priority />
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold">Our Mission & Values</h2>
            <div className="mt-4 prose max-w-none">{data?.companyBio && <PortableText value={data.companyBio} />}</div>
          </div>
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
            {awardEntries.map((a: any, idx: number) => {
              const title = a.title || 'Recognition'
              const year = a.year ? `${a.year}` : 'Honored'
              const badge = getAwardBadge(title)
              const imageUrl = typeof a?.image?.asset?.url === 'string' ? a.image.asset.url : badge
              const isRemoteImage = /^https?:\/\//i.test(imageUrl)

              return (
                <div key={idx} className="rounded-lg border bg-white p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-3">
                    {isRemoteImage ? (
                      <img src={imageUrl} alt={`${title} badge`} className="h-16 w-16 rounded-lg object-cover" />
                    ) : (
                      <Image src={imageUrl} alt={`${title} badge`} width={88} height={88} className="h-16 w-16 object-contain" />
                    )}
                  </div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-2 text-sm text-slate-500">{year}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

function PortableText({ value }: { value: any }) {
  if (!value) return null
  return (
    <div>
      {value.map((block: any, i: number) => (
        <p key={i}>{block.children?.map((c: any) => c.text).join('')}</p>
      ))}
    </div>
  )
}
