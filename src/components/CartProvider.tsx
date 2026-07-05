'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface CartItem {
  id: string
  slug: string
  name: string
  price: number
  quantity: number
  maxQuantity?: number
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  updateItem: (slug: string, quantity: number) => void
  removeItem: (slug: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const CART_STORAGE_KEY = 'kamzybee_cart_items'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY)
    if (raw) {
      try {
        const saved = JSON.parse(raw) as CartItem[]
        setItems(Array.isArray(saved) ? saved : [])
      } catch {
        setItems([])
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((cartItem) => cartItem.slug === item.slug)
      if (existing) {
        const newQuantity = Math.min(
          existing.maxQuantity ?? Number.MAX_SAFE_INTEGER,
          existing.quantity + quantity,
        )
        return current.map((cartItem) =>
          cartItem.slug === item.slug ? { ...cartItem, quantity: newQuantity } : cartItem,
        )
      }

      return [...current, { ...item, quantity }]
    })
  }

  const updateItem = (slug: string, quantity: number) => {
    setItems((current) =>
      current
        .map((cartItem) =>
          cartItem.slug === slug
            ? {
                ...cartItem,
                quantity: Math.max(1, Math.min(cartItem.maxQuantity ?? Number.MAX_SAFE_INTEGER, quantity)),
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    )
  }

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((cartItem) => cartItem.slug !== slug))
  }

  const clearCart = () => setItems([])

  const value = useMemo(
    () => ({
      items,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem,
      updateItem,
      removeItem,
      clearCart,
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartProvider
