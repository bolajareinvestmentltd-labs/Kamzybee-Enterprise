'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useCart } from '@/components/CartProvider'

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

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!slug) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/inventory?slug=${encodeURIComponent(slug)}`)
        if (!response.ok) {
          const body = await response.text()
          throw new Error(body || 'Product fetch failed')
        }

        const data = await response.json()
        if (!Array.isArray(data) || data.length === 0) {
          setError('Product not found')
          setProduct(null)
        } else {
          setProduct(data[0])
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h1>
            <Link href="/inventory" className="text-blue-600 hover:text-blue-700">
              ← Back to inventory
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const colors = product.colors?.split(',').map((c) => c.trim()) || []
  const storageOptions = product.storageRam?.split(',').map((s) => s.trim()) || []
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        maxQuantity: product.quantity,
      },
      quantity,
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/inventory" className="text-blue-600 hover:text-blue-700">
            Inventory
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden h-96">
            <div className="text-center text-slate-500">
              <span className="text-sm">Product image not available</span>
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <div className="mb-4 flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                {product.category}
              </span>
              {product.condition === 'UK Used' && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  {product.condition}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{product.brand}</p>

            <div className="mb-8">
              <p className="text-sm text-gray-600 mb-2">Price</p>
              <p className="text-4xl font-bold text-gray-900">
                ₦{product.price.toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </p>
            </div>

            <div className="mb-8 p-4 rounded-lg bg-gray-50">
              {product.quantity > 0 ? (
                <p className="text-lg font-medium text-green-600">
                  ✓ {product.quantity} units in stock
                </p>
              ) : (
                <p className="text-lg font-medium text-red-600">Out of stock</p>
              )}
            </div>

            {storageOptions.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Storage / RAM Options
                </p>
                <div className="flex flex-wrap gap-2">
                  {storageOptions.map((option, idx) => (
                    <button
                      key={idx}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {colors.length > 0 && (
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                  Available Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, idx) => (
                    <button
                      key={idx}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  −
                </button>
                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  disabled={quantity >= product.quantity}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="w-full mb-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <Link href="/inventory" className="text-center text-blue-600 hover:text-blue-700 font-medium py-2">
              ← Back to inventory
            </Link>
          </div>
        </div>

        {product.remarks && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{product.remarks}</p>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Category</p>
              <p className="text-lg font-semibold text-gray-900">{product.category}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Brand</p>
              <p className="text-lg font-semibold text-gray-900">{product.brand}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Condition</p>
              <p className="text-lg font-semibold text-gray-900">{product.condition}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">In Stock</p>
              <p className="text-lg font-semibold text-gray-900">{product.quantity} units</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
