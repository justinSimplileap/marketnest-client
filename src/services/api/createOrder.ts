/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import ProtectedAxiosInstance from '../ProtectedAxiosInstance';

export const createOrder = async (amount: number) => {
  try {
    const response = await ProtectedAxiosInstance.post(
      '/razorpay/create-order',
      {
        amount,
        currency: 'INR',
      }
    );

    const { orderId } = response.data;
    if (!orderId) {
      throw new Error('Order ID not received');
    }

    return orderId;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      'Failed to create Razorpay order. Please try again.';
    toast.error(errorMessage);
    console.error('Error creating order:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const verifyPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  cartItems: any[];
  userId: string;
  shippingAddressId: number;
  amount: number;
}) => {
  try {
    const response = await ProtectedAxiosInstance.post(
      '/razorpay/verify',
      paymentData
    );

    const { success, message, orderId } = response.data;

    if (!success) {
      throw new Error(message || 'Payment verification failed.');
    }

    return orderId;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      'Failed to verify payment. Please try again.';
    console.error('Error verifying payment:', errorMessage);
    toast.error(errorMessage);
  }
};
