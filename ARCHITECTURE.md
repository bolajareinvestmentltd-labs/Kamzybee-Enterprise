# 🏗️ KAMZYBEE ENTERPRISE - ARCHITECTURE DIAGRAM

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js 16)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   User Browser                           │  │
│  │                                                          │  │
│  │  ┌─────────────────────────────────────────────────────┐│  │
│  │  │ Page: /inventory (Listing)                         ││  │
│  │  │ - Search products                                  ││  │
│  │  │ - Filter by category                               ││  │
│  │  │ - View product grid                                ││  │
│  │  └─────────────────────────────────────────────────────┘│  │
│  │                        ↕                                 │  │
│  │  ┌─────────────────────────────────────────────────────┐│  │
│  │  │ Page: /inventory/[slug] (Detail)                   ││  │
│  │  │ - View full product info                           ││  │
│  │  │ - Select color, storage, quantity                  ││  │
│  │  │ - Add to cart button                               ││  │
│  │  └─────────────────────────────────────────────────────┘│  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Sanity Client Layer (src/sanity/)               │  │
│  │                                                          │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │  │
│  │  │ client.ts    │  │ queries.ts   │  │ types.ts     │  │  │
│  │  │              │  │              │  │              │  │  │
│  │  │ Creates      │  │ GROQ         │  │ TypeScript   │  │  │
│  │  │ Sanity       │  │ queries:     │  │ interfaces   │  │  │
│  │  │ client       │  │ • All prod   │  │ • Product    │  │  │
│  │  │              │  │ • By slug    │  │ • Image      │  │  │
│  │  │ Config:      │  │ • By cat     │  │ • Details    │  │  │
│  │  │ • Project ID │  │ • Categories │  │              │  │  │
│  │  │ • Dataset    │  │ • Brands     │  │              │  │  │
│  │  │ • API token  │  │              │  │              │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           ↓ HTTP/HTTPS                         │
└─────────────────────────────────────────────────────────────────┘
                            ↓
         ┌──────────────────────────────────┐
         │      SANITY CMS PLATFORM         │
         ├──────────────────────────────────┤
         │ Project ID: px6h4ity             │
         │ Dataset: production              │
         │                                  │
         │ ┌───────────────────────────┐   │
         │ │ Documents (Products)      │   │
         │ │                           │   │
         │ │ • name: "iPhone 16 Pro"   │   │
         │ │ • slug: "iphone-16-pro"   │   │
         │ │ • category: "Smartphone"  │   │
         │ │ • brand: "Apple"          │   │
         │ │ • price: 950000           │   │
         │ │ • colors: "Black, Silver" │   │
         │ │ • storage: "256GB, 512GB" │   │
         │ │ • quantity: 12            │   │
         │ │ • image: {...}            │   │
         │ │ • remarks: {...}          │   │
         │ │                           │   │
         │ │ (34 products total)       │   │
         │ └───────────────────────────┘   │
         │                                  │
         │ ┌───────────────────────────┐   │
         │ │ GROQ Query Processor      │   │
         │ │ Filters & Transforms      │   │
         │ └───────────────────────────┘   │
         └──────────────────────────────────┘
                            ↓
                  ┌─────────────────┐
                  │ JSON Response   │
                  │ (Product data)  │
                  └─────────────────┘
                            ↓ Back to Frontend
         ┌──────────────────────────────────┐
         │  Render UI + Display Data        │
         │  - Product grid/detail           │
         │  - Images & prices               │
         │  - Interactive elements          │
         └──────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│           OPTIONAL: PostgreSQL/Supabase Database                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  (Currently migrated, not integrated with frontend yet)        │
│                                                                 │
│  Tables:                                                        │
│  ├─ categories (Smartphone, Laptop, Accessory, etc.)           │
│  ├─ brands (Apple, Samsung, HP, Dell, etc.)                    │
│  ├─ products (model, category_id, brand_id, remarks)           │
│  └─ variants (storage, colors, condition, quantity, price)     │
│                                                                 │
│  Total Rows:                                                    │
│  ├─ Categories: 3                                              │
│  ├─ Brands: 8                                                  │
│  ├─ Products: 34                                               │
│  └─ Variants: 499 units                                        │
│                                                                 │
│  Future Use:                                                    │
│  ├─ Orders table                                               │
│  ├─ Users table                                                │
│  ├─ Reviews table                                              │
│  └─ Cart management                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                       App Router                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    layout.tsx                                  │
│                   (Root Layout)                                │
│                        │                                       │
│        ┌───────────────┼───────────────┐                      │
│        ↓               ↓               ↓                       │
│    page.tsx      inventory/      about/                        │
│    (Home)        page.tsx          page.tsx                    │
│  [TEMPLATE]      [LISTING]         [STUB]                     │
│                      │                                         │
│                      ↓                                         │
│             [slug]/page.tsx                                    │
│            [DETAIL PAGE]                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

LISTING PAGE (`/inventory/page.tsx`) Flow:
┌────────────────────────────────────────────────────────┐
│ useEffect on mount                                     │
│ ├─ fetch(ALL_PRODUCTS_QUERY)                          │
│ ├─ fetch(ALL_CATEGORIES_QUERY)                        │
│ └─ setProducts, setCategories                         │
└────────────────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────────┐
│ Render UI with state                                   │
│ ├─ Loading spinner                                    │
│ ├─ Error message                                      │
│ ├─ Search input (onChange updates state)              │
│ ├─ Category filter buttons (onClick updates state)    │
│ └─ Product grid                                       │
│    └─ Link to /inventory/[slug]                       │
└────────────────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────────┐
│ User Interactions                                      │
│ ├─ Type in search → filter products                   │
│ ├─ Click category → filter products                   │
│ ├─ Click product card → navigate to detail page       │
│ └─ Hover → scale animation                            │
└────────────────────────────────────────────────────────┘

DETAIL PAGE (`/inventory/[slug]/page.tsx`) Flow:
┌────────────────────────────────────────────────────────┐
│ useParams() + useEffect                                │
│ ├─ Get slug from URL                                  │
│ ├─ fetch(PRODUCT_BY_SLUG_QUERY, {slug})               │
│ └─ setProduct                                         │
└────────────────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────────┐
│ Render Full Product Page                              │
│ ├─ Large product image                                │
│ ├─ Product info (name, brand, price)                  │
│ ├─ Specifications grid                                │
│ ├─ Color selector (buttons)                           │
│ ├─ Storage selector (buttons)                         │
│ ├─ Quantity selector (+/-)                            │
│ ├─ Add to cart button                                 │
│ ├─ Product remarks/description                        │
│ ├─ Breadcrumb navigation                              │
│ └─ Back to inventory link                             │
└────────────────────────────────────────────────────────┘
            ↓
┌────────────────────────────────────────────────────────┐
│ User Interactions                                      │
│ ├─ Select color (state change)                        │
│ ├─ Select storage (state change)                      │
│ ├─ Change quantity (respects max stock)               │
│ ├─ Click "Add to cart" (future: sync to cart)         │
│ └─ Navigate back to inventory                         │
└────────────────────────────────────────────────────────┘
```

---

## Query Execution Sequence

```
REQUEST: GET /inventory (Listing Page)
│
├─ React mounts component
├─ useEffect triggers
│
├─ Query 1: ALL_PRODUCTS_QUERY
│   └─ *[_type == "product"] | order(_createdAt desc) {...}
│      └─ Returns: Array of 34 products
│
├─ Query 2: ALL_CATEGORIES_QUERY
│   └─ *[_type == "product"] {...} | [...].category | unique
│      └─ Returns: ["Smartphone", "Laptop", "Accessory"]
│
├─ setProducts(34 items)
├─ setCategories(3 categories)
└─ Render UI

USER ACTION: Search "iPhone"
│
├─ onChange event on search input
├─ setSearchQuery("iPhone")
├─ Filter products client-side:
│   └─ products.filter(p => 
│       p.name.includes("iPhone") || 
│       p.brand.includes("iPhone")
│      )
│      └─ Returns: 13 iPhone products
└─ Re-render grid with filtered results


REQUEST: GET /inventory/iphone-16-pro-max (Detail Page)
│
├─ React mounts component
├─ useParams extracts "iphone-16-pro-max"
├─ useEffect triggers
│
├─ Query: PRODUCT_BY_SLUG_QUERY
│   └─ *[_type == "product" && slug.current == "iphone-16-pro-max"][0]
│      └─ Returns: Single product object
│
├─ setProduct({
│    name: "iPhone 16 Pro Max",
│    price: 1200000,
│    quantity: 8,
│    ... all fields ...
│  })
│
└─ Render product detail page with full information
```

---

## State Management Flow

```
LISTING PAGE STATE:
┌─────────────────────────────────────────┐
│ products: Product[] = []                │
│ categories: string[] = []               │
│ selectedCategory: string | null = null  │
│ searchQuery: string = ""                │
│ loading: boolean = true                 │
│ error: string | null = null             │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│ Derived State (Computed):               │
│ filteredProducts = products             │
│   .filter(category)                     │
│   .filter(search)                       │
└─────────────────────────────────────────┘

DETAIL PAGE STATE:
┌─────────────────────────────────────────┐
│ product: Product | null = null          │
│ loading: boolean = true                 │
│ error: string | null = null             │
│ quantity: number = 1                    │
│ selectedColor: string | null = null     │
│ selectedStorage: string | null = null   │
└─────────────────────────────────────────┘
```

---

## File Organization

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx ........................ Root layout
│   │   ├── page.tsx ......................... Home (template)
│   │   ├── about/ ........................... About page (stub)
│   │   ├── contact/ ......................... Contact page (stub)
│   │   ├── inventory/
│   │   │   ├── page.tsx ..................... Listing page ✅
│   │   │   └── [slug]/
│   │   │       └── page.tsx ................. Detail page ✅
│   │   └── globals.css ...................... Global styles
│   │
│   ├── sanity/
│   │   ├── client.ts ........................ Sanity client ✅
│   │   ├── queries.ts ....................... GROQ queries ✅
│   │   └── types.ts ......................... TypeScript types ✅
│   │
│   └── components/ .......................... (empty, ready for use)
│
├── public/ ................................. Static files
├── .env.local .............................. Environment vars ✅
├── package.json ............................ Dependencies ✅
├── tsconfig.json ........................... TypeScript config
├── tailwind.config.js ...................... Tailwind config
└── next.config.ts .......................... Next.js config
```

---

## Environment Variables Architecture

```
.env.local (NOT COMMITTED)
│
├─ SANITY Variables
│  ├─ NEXT_PUBLIC_SANITY_PROJECT_ID = "px6h4ity"
│  ├─ NEXT_PUBLIC_SANITY_DATASET = "production"
│  ├─ NEXT_PUBLIC_SANITY_API_VERSION = "2024-12-02"
│  └─ SANITY_API_TOKEN = "xxxxx...." (secret)
│
├─ SUPABASE Variables (optional)
│  ├─ NEXT_PUBLIC_SUPABASE_URL = "https://xxx.supabase.co"
│  ├─ NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJ..."
│  └─ SUPABASE_SERVICE_ROLE_KEY = "eyJ..." (secret)
│
└─ APP Variables
   └─ NEXT_PUBLIC_APP_ENV = "development"
```

---

## Build & Runtime Flow

```
DEVELOPMENT:
npm run dev
    ↓
Next.js dev server starts on localhost:3000
    ↓
File changes trigger hot reload
    ↓
Browser reflects changes instantly

PRODUCTION:
npm run build
    ↓
TypeScript type checking
    ↓
Next.js optimization & bundling
    ↓
.next/ output directory created
    ↓
npm start
    ↓
Production server runs
    ↓
Optimized for performance & SEO
```

---

## Summary

This architecture provides:
- **Scalability**: Easy to add new pages/features
- **Maintainability**: Clear separation of concerns
- **Type Safety**: Full TypeScript coverage
- **Performance**: Client-side filtering, image optimization
- **Flexibility**: Can easily swap Sanity for another CMS later
- **Data Integrity**: Types enforced at compile time

Next iteration could add:
- Server-side rendering (SSR/SSG)
- API routes for backend logic
- Database integration layer
- Caching strategies
- Authentication system
