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
import { Product, RelatedProduct } from '@/types';

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<
    Product['variants'][0] | null
  >(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        try {
          const data = await getProductByIdClient(Number(productId));
          const fetchedProduct = Array.isArray(data?.product)
            ? data.product[0]
            : data?.product;

          setProduct(fetchedProduct);

          if (fetchedProduct?.variants?.length) {
            setSelectedVariant(fetchedProduct.variants[0] || null);
          }

          // Map related products to fit the Product type
          const mappedRelatedProducts = data?.relatedProducts.map(
            (relatedProduct: RelatedProduct) => ({
              ...relatedProduct,
              variants: [
                {
                  color: 'Default',
                  size: 'Default',
                  storage: 'Default',
                  variantPrice: relatedProduct.price,
                  discountPrice: relatedProduct.price,
                },
              ],
            })
          );

          setRelatedProducts(mappedRelatedProducts || []);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [productId]);

  const handleVariantChange = (variant: Product['variants'][0]) => {
    setSelectedVariant(variant);
  };

  const handleRelatedProductClick = (product: Product) => {
    if (product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  };

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
              product={product}
              onVariantChange={handleVariantChange}
            />

            <ProductActions
              product={product}
              selectedVariant={selectedVariant}
              updateCartItemCount={() => {}}
            />
            <ProductReviews />
          </div>
        </div>
        <RelatedProducts
          products={relatedProducts}
          onProductClick={handleRelatedProductClick}
        />
      </div>
      <Footer />
    </MainLayout>
  );
};

export default ProductPage;
