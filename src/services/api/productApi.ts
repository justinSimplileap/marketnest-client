import ProtectedAxiosInstance from '../ProtectedAxiosInstance';

// Define interfaces for categories and brands
interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}
interface images {
  imageUrl: string;
  orderBy: string | number;
}

interface Variant {
  id: number;
  color: string;
  ramSize: string;
  size: string;
  storage: string;
  sku: string;
  barcode: string;
  variantPrice: string;
  discountPrice: string;
  quantity: number;
  isFeatured: boolean;
}

// Define the product data structure
interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  variants: Variant[];
  images: images[];
  category: { name: string };
  brand: { name: string };
}
interface relatedProducts {
  id: number;
  name: string;
  price: string;
  description: string;
  images: images[];
  category: { name: string };
  brand: { name: string };
}

interface allProducts {
  product: Product[];
  relatedProducts: relatedProducts[];
}

// Get all products
export const getAllProducts = async (): Promise<Product> => {
  try {
    const response = await ProtectedAxiosInstance.get('/product/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const getAllProducts1 = async (
  categoryId?: number
): Promise<Product[]> => {
  try {
    const url = categoryId
      ? `/product/all?categoryId=${categoryId}`
      : '/product/all';
    const response = await ProtectedAxiosInstance.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

// Get a product by ID
export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await ProtectedAxiosInstance.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const getProductByIdClient = async (
  id: number
): Promise<allProducts> => {
  try {
    const response = await ProtectedAxiosInstance.get(`/product/client/${id}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// Get all categories
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await ProtectedAxiosInstance.get('/category/category/all');
    return response?.data?.data;
  } catch (error) {
    // console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get all brands
export const getBrands = async (): Promise<Brand[]> => {
  try {
    const response = await ProtectedAxiosInstance.get('/category/brand/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
};
