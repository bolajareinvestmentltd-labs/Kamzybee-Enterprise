// GROQ query for fetching all products
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    category,
    brand,
    storageRam,
    colors,
    condition,
    quantity,
    price,
    remarks,
    image {
      asset -> {
        url,
        altText
      },
      hotspot
    }
  }
`

// GROQ query for fetching a single product by slug
export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    category,
    brand,
    storageRam,
    colors,
    condition,
    quantity,
    price,
    remarks,
    image {
      asset -> {
        url,
        altText
      },
      hotspot
    }
  }
`

// GROQ query for fetching products by category
export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && category == $category] | order(_createdAt desc) {
    _id,
    name,
    slug,
    category,
    brand,
    storageRam,
    colors,
    condition,
    quantity,
    price,
    remarks,
    image {
      asset -> {
        url,
        altText
      },
      hotspot
    }
  }
`

// GROQ query for fetching all categories
export const ALL_CATEGORIES_QUERY = `
  *[_type == "product"] {
    category
  } | [].category | unique
`

// GROQ query for fetching all brands
export const ALL_BRANDS_QUERY = `
  *[_type == "product"] {
    brand
  } | [].brand | unique | sort
`
