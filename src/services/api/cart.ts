import ProtectedAxiosInstance from '../ProtectedAxiosInstance';

export const addProductCart = async (
  productId: number,
  quantity: number,
  color: string,
  size: string,
  storage: string,
  discountPrice: string,
  variantPrice: string
) => {
  const response = await ProtectedAxiosInstance.post('/cart/add', {
    productId,
    quantity,
    color,
    size,
    storage,
    discountPrice,
    variantPrice,
  });
  return response.data;
};
export const updateCartItem = async (itemId: number, quantity: number) => {
  const response = await ProtectedAxiosInstance.put(`/cart/${itemId}`, {
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (itemId: number) => {
  const response = await ProtectedAxiosInstance.delete(`/cart/${itemId}`);
  return response.data;
};

export const getCartItems = async () => {
  const response = await ProtectedAxiosInstance.get('/cart');
  return response?.data;
};
