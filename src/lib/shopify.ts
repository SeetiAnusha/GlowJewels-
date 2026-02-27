// Shopify Storefront API Client
// This uses the FREE Storefront API - no paid plan needed!

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Use the latest stable API version
const STOREFRONT_API_VERSION = '2024-10';

// Validate configuration
if (!SHOPIFY_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
  console.error('⚠️  Missing Shopify configuration!');
  console.error('Please create a .env file with:');
  console.error('VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com');
  console.error('VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here');
}

interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

// Generic fetch function for Shopify Storefront API
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const endpoint = `https://${SHOPIFY_DOMAIN}/api/${STOREFRONT_API_VERSION}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json: ShopifyResponse<T> = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

// Get all products
export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyFetch<{ products: any }>({ query });
}

// Get single product by handle
export async function getProduct(handle: string) {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        variants(first: 10) {
          edges {
            node {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  return shopifyFetch<{ product: any }>({ query, variables: { handle } });
}

// Create cart
export async function createCart() {
  const query = `
    mutation CreateCart {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `;

  return shopifyFetch<{ cartCreate: any }>({ query });
}

// Add item to cart
export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const query = `
    mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return shopifyFetch<{ cartLinesAdd: any }>({
    query,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
  });
}

export { shopifyFetch };
