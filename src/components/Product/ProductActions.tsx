import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface GalleryImage {
  imageUrl: string;
  orderBy: string | number;
}

interface Product {
  id: number;
  name: string;
  price: string;
  images: GalleryImage[];
  quantity?: number;
  stock?: number;
}

interface ProductActionsProps {
  product: Product;
  updateCartItemCount: (count: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { cart, addToCart, updateCartItemCount } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    setIsAnimating(true);

    // Using the addToCart function from the context
    addToCart(product);

    // Update the cart item count after adding the product
    updateCartItemCount(cart.reduce((sum, item) => sum + (item.stock || 1), 0));

    toast.success('Product added to cart!');
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleBuyNow = () => {
    toast.success('Proceeding to checkout');
  };

  return (
    <div className="flex gap-4 p-4">
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add to Cart
      </button>
      <button
        onClick={handleBuyNow}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Buy Now
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
