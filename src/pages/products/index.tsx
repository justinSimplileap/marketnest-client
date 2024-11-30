// /pages/products/index.tsx
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/Product/ProductGrid';
import { getAllProducts1 } from '@/services/api/productApi';
import { Product } from '@/types';
import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';

const ProductsPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts1(Number(categoryId));
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts(); 
    }
  }, [categoryId]); 
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="customWidth mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        <ProductGrid products={products} />
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
