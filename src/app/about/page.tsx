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
            <p className="mt-2 font-medium">{data?.ceoName}</p>
            <div className="mt-3 prose">{data?.ceoBio && <PortableText value={data.ceoBio} />}</div>
          </aside>
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
