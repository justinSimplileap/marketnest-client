import Footer from '@/components/home/Footer';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartContext } from '@/context/CartContext';
import { useRouter } from 'next/router';
import {
  updateCartItem,
  removeFromCart,
  getCartItems,
} from '@/services/api/cart';
import toast from 'react-hot-toast';
import { formatPrice } from '@/utils/helper';

interface GalleryImage {
  imageUrl: string;
  orderBy: string | number;
}

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: GalleryImage[];
  stock: number;
  discountPrice: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
};

const Cart: React.FC = () => {
  const router = useRouter();
  const { setCart } = useCartContext();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCartItems();
        console.log('dataa', data);
        setCartItems(data.data);
        setCart(data.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchCartItems();
  }, [setCart]);

  const updateQuantity = async (itemId: number, newQuantity: number) => {
    try {
      if (newQuantity < 1) {
        toast.error('Quantity cannot be less than 1');
        return;
      }

      await updateCartItem(itemId, newQuantity);

      const data = await getCartItems();
      setCartItems(data.data);
      setCart(data.data);

      if (data.data.length === 0) {
        toast.error('Your cart is now empty.');
      }

      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast.error('Failed to update cart item');
    }
  };

  const removeItem = async (id: number) => {
    try {
      await removeFromCart(id);

      const updatedCart = cartItems.filter((item) => item.id !== id);

      setCartItems(updatedCart);

      setCart(updatedCart);

      localStorage.setItem('cart', JSON.stringify(updatedCart));

      if (updatedCart.length === 0) {
        toast.error('Your cart is now empty.');
      } else {
        toast.success('Item removed');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error removing item:', error);
      toast.error(error?.response?.data?.message ?? 'Error');
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + parseFloat(item?.discountPrice) * item?.quantity,
      0
    );
    return total.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCheckout = async () => {
    router.push({
      pathname: '/checkout',
      query: { cart: JSON.stringify(cartItems) },
    });
  };

  return (
    <MainLayout>
      <div className="customWidth mx-auto py-10 px-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>

        {cartItems?.length > 0 ? (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <Image
                    src={item?.product?.images?.[0]?.imageUrl ?? '/'}
                    alt={item.name ?? 'Product'}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">
                      {item?.product?.name}
                    </h2>
                    <p className="text-gray-500">
                      Price: {formatPrice(item?.discountPrice)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-2 py-1 border border-gray-300 rounded-l"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b border-gray-300">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 border border-gray-300 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                    <p className="font-semibold mt-2">
                      {formatPrice(
                        parseFloat(item?.discountPrice) * item?.quantity
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-right">
              <h2 className="text-2xl font-semibold">
                Total: {calculateTotal()}
              </h2>
              <button
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-lg">Your cart is empty.</p>
        )}
      </div>
      <Footer />
    </MainLayout>
  );
};

export default Cart;
