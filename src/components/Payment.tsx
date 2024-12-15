/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import Script from 'next/script';
import toast from 'react-hot-toast';
import { createOrder, verifyPayment } from '@/services/api/createOrder';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  product: any;
  userId: string;
}

interface PaymentPageProps {
  totalAmount: number;
  cartItems: CartItem[];
  selectedAddress: any;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  totalAmount,
  cartItems,
  selectedAddress,
}) => {
  console.log('cartItems', cartItems);
  console.log('totalAmount', totalAmount);
  console.log('selectedAddress', selectedAddress);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const orderId = await createOrder(totalAmount * 100);

      if (!orderId) {
        throw new Error('Order ID not received');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalAmount,
        currency: 'INR',
        name: 'VENOM WOLF',
        description: 'Order Payment',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            const paymentResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              cartItems,
              userId: cartItems[0]?.userId,
              shippingAddressId: selectedAddress.id,
              amount: totalAmount,
            });

            console.log('paymentResponse', paymentResponse);
            toast.success('Payment successful! ');
            router.push('/');
          } catch (err) {
            console.error('Error verifying payment:', err);
            toast.error('An error occurred while verifying the payment.');
          }
        },
        prefill: {
          name: selectedAddress?.name,
          contact: selectedAddress?.phoneNumber,
        },
        theme: {
          color: '#4CAF50',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', (response: any) => {
        toast.error(`Payment Failed: ${response.error.description}`);
      });
      rzp1.open();
    } catch (error: any) {
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="bg-white p-8 rounded orderDetaillsCard border  w-full">
        <p className="text-gray-600 text-left mb-6">
          Click the button below to make a payment of ₹{totalAmount}.
        </p>
        {selectedAddress ? (
          <button
            id="rzp-button1"
            disabled={isProcessing}
            className={` py-2 px-4 text-white font-semibold rounded transition-all duration-200 ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={handlePayment}
          >
            {isProcessing ? 'Processing...' : 'Proceed to pay'}
          </button>
        ) : (
          'Please Select Shipping address'
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
