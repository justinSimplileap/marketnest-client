import { useAppContext } from '@/context/AppContext';
import { addProductCart } from '@/services/api/cart';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ProductVariant {
  barcode?: null;
  color: string;
  discountPrice: string;
  isFeatured: false;
  quantity: number;
  ramSize: null;
  size: string;
  sku: null;
  storage: string;
  variantPrice: string;
}

interface images {
  imageUrl: string;
  orderBy: string | number;
}

interface Product {
  id: number;
  name: string;
  price: string;
  images: images[];
  variants: ProductVariant[];
  quantity?: number;
  stock?: number;
}

interface ProductActionsProps {
  product: Product;
  selectedVariant: ProductVariant;
  updateCartItemCount: (count: number) => void;
}
interface ProductWithVariant extends Product {
  selectedVariant: ProductVariant;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  selectedVariant,
  updateCartItemCount,
}) => {
  const { cart, addToCart } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);

  console.log('selectedVariant', selectedVariant);
  console.log('product', product);

  const handleAddToCart = async () => {
    setIsAnimating(true);

    const productId = product.id;
    const quantity = 1;

    const { color, size, storage, discountPrice, variantPrice } =
      selectedVariant;

    try {
      const response = await addProductCart(
        productId,
        quantity,
        color,
        size,
        storage,
        discountPrice,
        variantPrice
      );

      if (response.status === 'success') {
        addToCart({ ...product, selectedVariant } as ProductWithVariant);
        updateCartItemCount(
          cart.reduce((sum, item) => sum + (item.stock || 1), 0)
        );
      } else {
        toast.error(response.message || 'Failed to add product to cart');
      }
    } catch (error) {
      toast.error('There was an error adding the product to the cart');
      console.log('error', error);
    } finally {
      setTimeout(() => {
        setIsAnimating(false);
        toast.success('Product added to cart!');
      }, 1000);
    }
  };

  return (
    <div className="flex gap-4 p-4">
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add to Cart
      </button>
      {isAnimating && (
        <div className="absolute animation-container">
          <Image
            src={product?.images?.[0]?.imageUrl || '/placeholder.png'}
            alt={product.name}
            className="animation-image"
            width={50}
            height={50}
          />
        </div>
      )}
    </div>
  );
};

export default ProductActions;
