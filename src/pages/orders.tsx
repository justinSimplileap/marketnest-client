import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { getOrderDetails } from '@/services/api/orderDetails';
import MainLayout from '@/components/layout/MainLayout';
import Footer from '@/components/home/Footer';

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  product: {
    name: string;
    description: string;
    price: string;
    images: Array<{ imageUrl: string }>;
  };
}

interface ShippingAddress {
  name: string;
  phoneNumber: string;
  flatHouseBuilding: string;
  areaStreetSectorVillage: string;
  landmark: string;
  townCity: string;
  state: string;
  country: string;
}

interface Order {
  id: string;
  transactionId: string;
  userId: string;
  shippingAddressId: number;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  trackingNumber: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
}

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  console.log('orders', orders);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetails();
        console.log('data', data);

        setOrders(data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error('No orders found');
      }
    };

    fetchOrderDetails();
  }, []);

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <MainLayout>
      <div className="customWidth mx-auto p-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">My Orders</h2>

        {orders.length < 1 ? (
          <div className="h-[calc(100vh-29.2rem)]">
            <p className="font-semibold text-gray-700">No Orders Yet</p>
          </div>
        ) : (
          <>
            {orders?.map((order) => (
              <div
                key={order?.id}
                className="p-6 rounded-lg shadow-lg bg-white mb-6"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  <div className="lg:w-1/3">
                    {order.orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 mb-6"
                      >
                        <Image
                          width={96}
                          height={96}
                          src={item.product.images[0]?.imageUrl}
                          alt={item.product.name}
                          className="w-32 h-32 object-contain rounded"
                        />
                        <div>
                          <p className="font-semibold text-gray-700">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ₹{item.unitPrice}
                          </p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-lg font-semibold text-gray-700">
                            Total: ₹{item.totalPrice}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4 pb-4">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-700">Order ID:</p>
                        <p>#{order.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-700">
                          Order placed:
                        </p>
                        <p>{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-700">Name:</p>
                        <p>{order.shippingAddress.name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-700">Phone:</p>
                        <p>{order.shippingAddress.phoneNumber}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-700">
                          Payment Status:
                        </p>
                        <p>{order.paymentStatus}</p>
                      </div>
                      <div className="flex items-start gap-2 col-span-2">
                        <p className="font-semibold text-gray-700">
                          Shipping Address:
                        </p>
                        <p>
                          {order.shippingAddress.flatHouseBuilding},{' '}
                          {order.shippingAddress.areaStreetSectorVillage},{' '}
                          {order.shippingAddress.landmark},{' '}
                          {order.shippingAddress.townCity},{' '}
                          {order.shippingAddress.state},{' '}
                          {order.shippingAddress.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Footer />
    </MainLayout>
  );
};

export default OrderPage;
