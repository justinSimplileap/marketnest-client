import Footer from '@/components/home/Footer';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useCartContext } from '@/context/CartContext';
import { useRouter } from 'next/router';

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
};

const Cart: React.FC = () => {
  const router = useRouter();
  const { cart, setCart } = useCartContext();
  const [cartItems, setCartItems] = useState<CartItem[]>(cart);

  useEffect(() => {
    // Always sync cart data with localStorage
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setCartItems(parsedCart);
      setCart(parsedCart);
    }
  }, [setCart]);

  const updateStock = (id: number, newStock: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            stock: Math.min(newStock, item.quantity),
          }
        : item
    );
    setCartItems(updatedItems);
    setCart(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    setCart(updatedItems);

    if (updatedItems.length === 0) {
      // If the cart is empty, remove it from localStorage
      localStorage.removeItem('cart');
    } else {
      // Otherwise, update the localStorage with the new cart state
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.stock,
      0
    );
    return total.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCheckout = () => {
    router.push({
      pathname: '/checkout',
      query: { cart: JSON.stringify(cartItems) },
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <MainLayout>
      <div className="customWidth mx-auto py-10 px-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>

        {cartItems.length > 0 ? (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4"
                >
                  <Image
                    src={item?.images?.[0]?.imageUrl}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-gray-500">
                      Price: {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateStock(item.id, item.stock - 1)}
                        className="px-2 py-1 border border-gray-300 rounded-l"
                        disabled={item.stock === 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b border-gray-300">
                        {item.stock}
                      </span>
                      <button
                        onClick={() => updateStock(item.id, item.stock + 1)}
                        className="px-2 py-1 border border-gray-300 rounded-r"
                        disabled={item.stock >= item.quantity}
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
                      {formatPrice(item.price * item.stock)}
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
