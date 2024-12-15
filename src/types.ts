interface images {
  imageUrl: string;
  orderBy: string | number;
}
// interface Variant {
//   id: number;
//   color: string;
//   ramSize: string | null;
//   size: string;
//   storage: string;
//   sku: string;
//   barcode: string;
//   variantPrice: string;
//   discountPrice: string;
//   quantity: number;
//   isFeatured: boolean;
// }

// Define the product data structure
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: images[];
  category: { name: string };
  brand: { name: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variants: any[];
}

export interface RelatedProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  images: images[];
  category: { name: string };
  brand: { name: string };
}

export interface ProductVariant {
  color: string;
  size: string;
  storage: string;
  variantPrice: string;
  discountPrice: string;
}
