import ProtectedAxiosInstance from '../ProtectedAxiosInstance';

export const getOrderDetails = async () => {
  const response = await ProtectedAxiosInstance.get('/order-details');
  return response?.data?.data;
};
