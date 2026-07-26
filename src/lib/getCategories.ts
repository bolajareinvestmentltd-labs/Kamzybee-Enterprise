import { client } from './sanityClient'

export async function getCategories() {
  const q = `*[_type == "category"]{title, "imageUrl": image.asset->url}[0...10]`
  const res = await client.fetch(q)
  if (!res) {
    return [
      { title: 'Phones & Tablets', imageUrl: 'https://via.placeholder.com/160?text=Phones' },
      { title: 'Laptops', imageUrl: 'https://via.placeholder.com/160?text=Laptops' },
      { title: 'Accessories', imageUrl: 'https://via.placeholder.com/160?text=Accessories' },
      { title: 'Smart Watches', imageUrl: 'https://via.placeholder.com/160?text=Watches' },
      { title: 'Fragrances', imageUrl: 'https://via.placeholder.com/160?text=Fragrances' },
    ]
  }
  return res
}
