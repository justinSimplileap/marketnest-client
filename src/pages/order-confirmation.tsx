import { useRouter } from 'next/router';
import Footer from '@/components/home/Footer';
import MainLayout from '@/components/layout/MainLayout';

const OrderConfirmation: React.FC = () => {
  const router = useRouter();
  const { orderId } = router.query; // Fetch orderId from the query params

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto pt-8 pb-16 px-4">
        {/* Title Section */}
        <div className="text-center mb-8">
          {/* <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" /> */}
          <h1 className="text-4xl font-semibold text-gray-900">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-gray-600">
            Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Summary
          </h2>
          <div className="mt-4">
            <p className="text-lg text-gray-700">
              Order ID: <span className="font-bold">{orderId}</span>
            </p>
            {/* Add more details here, like items, total amount, etc. */}
            <div className="mt-4">
              <p className="text-lg text-gray-700">
                Your items will be shipped soon. You will receive an email
                confirmation shortly.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Confirmation */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Payment Status
          </h3>
          <div className="mt-4 flex items-center space-x-2">
            {/* <CheckCircleIcon className="w-6 h-6 text-green-500" /> */}
            <p className="text-lg text-green-500">Payment Successful</p>
          </div>
          <p className="text-gray-700 mt-2">
            Thank you for using our service. We will process your order shortly.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <Footer />
    </MainLayout>
  );
};

export default OrderConfirmation;
