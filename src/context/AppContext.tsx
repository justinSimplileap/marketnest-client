import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
};

type Notification = {
  id: string;
  message: string;
  isRead: boolean;
};

type Product = {
  id: number;
  name: string;
  price: string;
  image?: string;
  quantity?: number;
  stock?: number;
};

type AppContextType = {
  user: User | null;
  cart: Product[]; // Add cart to context
  notifications: Notification[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  addToCart: (product: Product) => void; // Add to cart method
  updateCartItemCount: (count: number) => void; // Update cart item count method
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Product[]>([]); // Manage cart globally
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const addToCart = (product: Product) => {
    const productExists = cart.find((item) => item.id === product.id);

    if (productExists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, stock: (item.stock || 1) + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, stock: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const updateCartItemCount = (count: number) => {
    localStorage.setItem('cartItemCount', JSON.stringify(count));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        notifications,

        setUser,
        addNotification,
        markNotificationAsRead,
        addToCart,
        updateCartItemCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error('useAppContext must be used within AppProvider');
  return context;
};
