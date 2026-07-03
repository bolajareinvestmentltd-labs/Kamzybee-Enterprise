'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {sanityFetch} from '@/sanity/client'
import {ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY} from '@/sanity/queries'
import {Product} from '@/sanity/types'

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch all products
        const allProducts = await sanityFetch(ALL_PRODUCTS_QUERY)
        setProducts(allProducts || [])

        // Fetch all categories
        const allCategories = await sanityFetch(ALL_CATEGORIES_QUERY)
        setCategories(allCategories || [])
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products based on category and search query
  let filteredProducts = products

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory)
  }

  if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Inventory</h1>
          <p className="text-lg text-gray-600">Browse our latest products and tech gear</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="font-semibold">{products.length}</span> products
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/inventory/${product.slug.current}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    {product.image?.asset?.url ? (
                      <Image
                        src={product.image.asset.url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span>No image</span>
                      </div>
                    )}
                    {product.condition === 'UK Used' && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded">
                        UK Used
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{product.category}</p>
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">{product.brand}</p>
                    </div>

                    {/* Storage/RAM Info */}
                    {product.storageRam && (
                      <p className="text-xs text-gray-500 mb-2">{product.storageRam}</p>
                    )}

                    {/* Colors */}
                    {product.colors && (
                      <p className="text-xs text-gray-500 mb-3">Colors: {product.colors}</p>
                    )}

                    {/* Stock Status */}
                    <div className="mb-3">
                      {product.quantity > 0 ? (
                        <p className="text-xs font-medium text-green-600">
                          {product.quantity} in stock
                        </p>
                      ) : (
                        <p className="text-xs font-medium text-red-600">Out of stock</p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <p className="text-lg font-bold text-gray-900">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedCategory
                ? 'Try adjusting your filters or search query'
                : 'No products available at the moment'}
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
