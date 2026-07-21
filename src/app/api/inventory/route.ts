import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const fallbackProducts = [
  {
    id: 'demo-1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    remarks: 'Premium flagship device with Titanium finish.',
    condition: 'New',
    quantity: 10,
    price: 950000,
    storageRam: '256GB',
    colors: 'Natural Titanium, Blue Titanium',
    slug: 'iphone-15-pro-max',
  },
  {
    id: 'demo-2',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    remarks: 'Slim everyday performance laptop.',
    condition: 'New',
    quantity: 6,
    price: 1450000,
    storageRam: '16GB RAM / 512GB',
    colors: 'Space Gray, Silver',
    slug: 'macbook-air-m3',
  },
  {
    id: 'demo-3',
    name: 'Galaxy Watch 6',
    brand: 'Samsung',
    category: 'Accessories',
    remarks: 'Feature-packed smartwatch for everyday health tracking.',
    condition: 'New',
    quantity: 14,
    price: 260000,
    storageRam: '44mm',
    colors: 'Graphite, Silver',
    slug: 'galaxy-watch-6',
  },
]

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category')
  const search = request.nextUrl.searchParams.get('search')
  const slug = request.nextUrl.searchParams.get('slug')

  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  )

  if (!hasSupabaseConfig || !supabaseAdmin) {
    return NextResponse.json(filterProducts(fallbackProducts, { category, search, slug }))
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select(`id, model, remarks, category_id, brand_id, variants(unit_price_ngn, quantity, condition, storage_options, colors), categories(name), brands(name)`)
      .order('model', { ascending: true })

    if (error) {
      throw error
    }

    const products = (data ?? []).map((row: any) => ({
      id: row.id,
      name: row.model,
      brand: row.brands?.name ?? 'Unknown',
      category: row.categories?.name ?? 'Unknown',
      remarks: row.remarks ?? '',
      condition: row.variants?.[0]?.condition ?? 'Unknown',
      quantity: row.variants?.[0]?.quantity ?? 0,
      price: row.variants?.[0]?.unit_price_ngn ?? 0,
      storageRam: row.variants?.[0]?.storage_options?.join(', ') ?? '',
      colors: row.variants?.[0]?.colors?.join(', ') ?? '',
      slug: row.model.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))

    return NextResponse.json(filterProducts(products, { category, search, slug }))
  } catch (error) {
    console.error('Inventory route fell back to demo data:', error)
    return NextResponse.json(filterProducts(fallbackProducts, { category, search, slug }))
  }
}

function filterProducts(
  products: Array<{
    id: string
    name: string
    brand: string
    category: string
    remarks: string
    condition: string
    quantity: number
    price: number
    storageRam: string
    colors: string
    slug: string
  }>,
  filters: {
    category: string | null
    search: string | null
    slug: string | null
  },
) {
  return products.filter((product) => {
    if (filters.slug && product.slug !== filters.slug) {
      return false
    }

    if (filters.category && product.category !== filters.category) {
      return false
    }

    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase()
      return (
        product.name.toLowerCase().includes(lowerSearch) ||
        product.brand.toLowerCase().includes(lowerSearch) ||
        product.category.toLowerCase().includes(lowerSearch)
      )
    }

    return true
  })
}
