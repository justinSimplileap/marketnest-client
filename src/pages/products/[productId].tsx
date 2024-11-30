import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ProductGallery from '@/components/Product/ProductGallery';
import ProductDetails from '@/components/Product/ProductDetails';
import ProductActions from '@/components/Product/ProductActions';
import ProductReviews from '@/components/Product/ProductReviews';
import RelatedProducts from '@/components/Product/RelatedProducts';
import Footer from '@/components/home/Footer';
import { getProductByIdClient } from '@/services/api/productApi';

interface Image {
  imageUrl: string;
  orderBy: string | number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  images: Image[];
  category: { name: string };
  brand: { name: string };
}

interface RelatedProduct {
  id: number;
  name: string;
  price: string;
  description: string;
  images: Image[];
  category: { name: string };
  brand: { name: string };
}

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        try {
          const data = await getProductByIdClient(Number(productId));
          const product = Array.isArray(data?.product)
            ? data.product[0]
            : data?.product;
          setProduct(product);
          setRelatedProducts(data?.relatedProducts);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <MainLayout>
      <div className="customWidth">
        <div className="mx-auto py-10 grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.images} />
          <div>
            <ProductDetails
              name={product?.name}
              description={product?.description}
              price={product?.price}
            />
            <ProductActions
              product={product}
              updateCartItemCount={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
            <ProductReviews />
          </div>
        </div>
        <RelatedProducts products={relatedProducts} />
      </div>
      <Footer />
    </MainLayout>
  );
};

export default ProductPage;
