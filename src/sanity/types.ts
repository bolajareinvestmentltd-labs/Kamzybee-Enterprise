// TypeScript types for Sanity Product schema

export interface ProductImage {
  asset: {
    url: string
    altText?: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  category: 'Smartphone' | 'Laptop' | 'Accessory' | 'Cars' | 'Land'
  brand: string
  storageRam?: string
  colors?: string
  condition: 'New' | 'UK Used'
  quantity: number
  price: number
  remarks?: string
  image?: ProductImage
}

export interface ProductDetail extends Product {
  // Can extend with additional fields if needed
}
