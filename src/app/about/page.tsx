import Image from 'next/image'
import { client } from '@/lib/sanityClient'

const query = '*[_type == "aboutPage"][0]{companyBio, ceoName, ceoBio, ceoImage{asset->{url}}, awards[]{title,year,image{asset->{url}}}, cacCertificateImage{asset->{url}}}'

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
  let data: any = null
  try {
    data = await client.fetch(query)
  } catch (error) {
    console.warn('Sanity fetch error:', error)
    data = null
  }

  const ceoImageUrl = data?.ceoImage?.asset?.url || '/images/about/ceo-portrait.jpeg'
  const awardEntries = Array.isArray(data?.awards) && data.awards.length > 0 ? data.awards : defaultAwards
  const cacImageUrl = data?.cacCertificateImage?.asset?.url || '/images/awards/certificate-badge.svg'
  const ceoIsRemote = /^https?:\/\//i.test(ceoImageUrl)
  const cacIsRemote = /^https?:\/\//i.test(cacImageUrl)

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">About Kamzybee Global Enterprise</h1>
        <section className="mt-8 space-y-6">
          <div className="prose max-w-none">{data?.companyBio ? <PortableText value={data.companyBio} /> : <p>Kamzybee Global Enterprise is a trusted source for top tech products, combining quality, value, and service across Nigeria and beyond.</p>}</div>
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

          <div className="md:col-span-2 space-y-6">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">Our Mission & Values</h2>
              <div className="mt-4 prose max-w-none">{data?.companyBio ? <PortableText value={data.companyBio} /> : <p>We deliver premium technology with honesty, service, and trusted value for Rotary and general customers alike.</p>}</div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold">CEO Profile</h2>
              <p className="mt-4 text-sm text-slate-700">{data?.ceoName || 'Kamaldeen Oyewumi'} leads Kamzybee Global Enterprise with a focus on service, youth empowerment, and sustainable growth.</p>
              <div className="mt-4 prose max-w-none">{data?.ceoBio ? <PortableText value={data.ceoBio} /> : <p>As the Chief Executive Officer, Kamaldeen drives the brand forward with integrity, community leadership, and a passion for delivering quality customer experiences.</p>}</div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Certifications & Awards</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {awardEntries.map((a: any, idx: number) => {
              const title = a.title || 'Recognition'
              const year = a.year ? `${a.year}` : 'Honored'
              const badge = getAwardBadge(title)
              const imageUrl = typeof a?.image?.asset?.url === 'string' ? a.image.asset.url : badge
              const isRemoteImage = /^https?:\/\//i.test(imageUrl)

              return (
                <div key={idx} className="rounded-lg border bg-slate-50 p-4 shadow-sm">
                  <div className="mb-4 flex items-center justify-center rounded-xl border border-slate-100 bg-white p-3">
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

        <section className="mt-12 rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Certificate of Incorporation</h2>
          <div className="mt-6 overflow-hidden rounded-3xl bg-slate-50 p-6">
            {cacIsRemote ? (
              <img src={cacImageUrl} alt="CAC Certificate" className="mx-auto max-h-[420px] w-full object-contain" />
            ) : (
              <Image src={cacImageUrl} alt="CAC Certificate" width={1200} height={800} className="mx-auto max-h-[420px] w-full object-contain" />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

function PortableText({ value }: { value: any }) {
  if (!value || !Array.isArray(value)) return null
  return (
    <div>
      {value.map((block: any, i: number) => (
        <p key={i}>{block.children?.map((c: any) => c.text).join('')}</p>
      ))}
    </div>
  )
}
