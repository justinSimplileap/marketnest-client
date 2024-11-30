interface images {
  imageUrl: string;
  orderBy: string | number;
}
export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: images[];
  category: { name: string };
  brand: { name: string };
}
