'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

interface Product {
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
}

const fallbackProducts: Product[] = [
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

const defaultCategories = ['Smartphones', 'Laptops', 'Accessories', 'Business Solutions', 'Wearables']

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const urlSearchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const categoryParam = urlSearchParams?.get('category')
    const searchParam = urlSearchParams?.get('search')

    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }

    if (searchParam) {
      setSearchQuery(searchParam)
    }

    const fetchData = async () => {
      try {
        setLoading(true)
        setFetchError(null)

        const query = new URLSearchParams()
        if (categoryParam) query.set('category', categoryParam)
        if (searchParam) query.set('search', searchParam)

        const url = `/api/inventory${query.toString() ? `?${query.toString()}` : ''}`
        const response = await fetch(url)
        if (!response.ok) {
          const body = await response.text()
          throw new Error(body || 'Inventory fetch failed')
        }

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        console.error('Error fetching data:', err)
        setProducts(fallbackProducts)
        setFetchError('Live inventory is temporarily unavailable. Showing sample products.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(new Set(products.map((product) => product.category))).filter(Boolean)
    return dynamicCategories.length > 0 ? dynamicCategories : defaultCategories
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      return [product.name, product.brand, product.category, product.remarks]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)
    })
  }, [products, selectedCategory, searchQuery])

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Inventory</h1>
          <p className="text-lg text-slate-600">Browse your live Supabase product inventory with filters for category and search.</p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="Search products by name, brand, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-3xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex min-h-[20rem] items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
            Live inventory is temporarily unavailable, so preview demo products are shown instead.
          </div>
        )}

        {!loading && !error && (
          <div className="mb-4 text-sm text-slate-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
          </div>
        )}

        {!loading && filteredProducts.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/inventory/${product.slug}`} className="group">
                <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-44 items-center justify-center bg-slate-100 px-4 text-center text-slate-500">
                    <span className="text-sm">Product image not available</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{product.category}</p>
                      <h2 className="mt-3 text-xl font-semibold text-slate-900">{product.name}</h2>
                      <p className="mt-2 text-sm text-slate-600">{product.brand}</p>
                    </div>

                    <div className="mt-auto">
                      <p className="text-sm text-slate-500">Condition</p>
                      <p className="text-base font-semibold text-slate-900">{product.condition}</p>
                      <p className="mt-3 text-2xl font-bold text-slate-900">₦{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">No products found</h2>
            <p className="mt-3 text-slate-600">Try changing the search terms or category filter to view matching inventory.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
              className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
