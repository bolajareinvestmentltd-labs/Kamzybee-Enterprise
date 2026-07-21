import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category')
  const search = request.nextUrl.searchParams.get('search')
  const slug = request.nextUrl.searchParams.get('slug')

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 })
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .select(`id, model, remarks, category_id, brand_id, variants(unit_price_ngn, quantity, condition, storage_options, colors), categories(name), brands(name)`)
    .order('model', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
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

  const filteredProducts = products.filter((product) => {
    if (slug && product.slug !== slug) {
      return false
    }

    if (category && product.category !== category) {
      return false
    }

    if (search) {
      const lowerSearch = search.toLowerCase()
      return (
        product.name.toLowerCase().includes(lowerSearch) ||
        product.brand.toLowerCase().includes(lowerSearch) ||
        product.category.toLowerCase().includes(lowerSearch)
      )
    }

    return true
  })

  return NextResponse.json(filteredProducts)
}
