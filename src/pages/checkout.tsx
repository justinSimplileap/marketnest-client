/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/router';
import Footer from '@/components/home/Footer';
import MainLayout from '@/components/layout/MainLayout';

import PaymentPage from '@/components/Payment';
import Addresses from '@/components/address/addresses';
import { useState } from 'react';

interface GalleryImage {
  imageUrl: string;
  orderBy: string | number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  images: GalleryImage[];
  stock: number;
  product: any;
  userId: string;
  discountPrice: string;
  variantPrice: string;
}
interface ShippingDetails {
  id?: number;
  name: string;
  address: string;
  city: string;
  pincode: string;
  country: string;
  phoneNumber: string;
  flatHouseBuilding: string;
  areaStreetSectorVillage: string;
  landmark: string;
  townCity: string;
  state: string;
}

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart } = router.query;

  const parsedCart: CartItem[] = cart ? JSON.parse(cart as string) : [];
  const [selectedAddress, setSelectedAddress] =
    useState<ShippingDetails | null>(null);

  console.log('parsedCart', parsedCart);

  // Helper function to format currency in INR format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <MainLayout>
      <div className="customWidth mx-auto pt-4">
        <h2 className="text-3xl font-semibold mb-6 text-center">Checkout</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 mb-8  gap-8">
          <div className="space-y-4 col-span-2 orderDetaillsCard p-4 rounded-xl">
            {/* Section 1 */}
            <Addresses setSelectedAddress={setSelectedAddress} />
            <div className=" flex flex-col gap-4">
              <div className="flex gap-4">
                <p className=" h-10 w-10 border rounded-full flex justify-center items-center">
                  02
                </p>
                <p className=" text-2xl font-semibold"> Payment</p>
              </div>

              {/* Section 2 */}

              <PaymentPage
                totalAmount={parsedCart.reduce(
                  (total, item) =>
                    total + parseFloat(item?.discountPrice) * item.quantity,
                  0
                )}
                cartItems={parsedCart}
                selectedAddress={selectedAddress}
              />
            </div>
          </div>
          {/* Order Details */}
          <div className=" sticky top-4 h-fit orderDetaillsCard p-4 rounded-lg">
            <h2 className="text-2xl font-semibold">Order Details</h2>
            {parsedCart.length > 0 ? (
              parsedCart.map((item) => (
                <div key={item.id} className="flex flex-col  py-2">
                  <div className="flex justify-between w-full">
                    <p>Item Name:</p>
                    <p>{item?.product?.name}</p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p>Actual Price</p>
                    <p>
                      {formatCurrency(parseFloat(item?.variantPrice))}
                      {item?.quantity}
                    </p>
                  </div>
                  <div className="flex justify-between w-full">
                    <p>Discount Price</p>
                    <p>
                      {formatCurrency(
                        parseFloat(item?.variantPrice) -
                          parseFloat(item?.discountPrice)
                      )}
                      {item?.quantity}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}
            {selectedAddress ? (
              <div className="as">
                <div className="flex items-center justify-between my-1">
                  <p className=" font-semibold">User:</p>
                  <p className="font-medium">{selectedAddress.name}</p>
                </div>

                <div className="border-t pt-4">
                  <p className=" font-semibold">Shipping address:</p>

                  <p>
                    {selectedAddress.flatHouseBuilding},{' '}
                    {selectedAddress.areaStreetSectorVillage}
                  </p>
                  <p>
                    {selectedAddress.townCity}, {selectedAddress.state} -{' '}
                    {selectedAddress.pincode}
                  </p>
                  <p>{selectedAddress.country}</p>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className="border-t pt-4 flex justify-between items-center w-full text-xl font-semibold">
              <p>Total:</p>
              <p>
                {formatCurrency(
                  parsedCart.reduce(
                    (total, item) =>
                      total + parseFloat(item?.discountPrice) * item?.quantity,
                    0
                  )
                )}
              </p>
            </div>
          </div>
        </div>
        {/* end of section  */}
      </div>

      <Footer />
    </MainLayout>
  );
};

export default Checkout;
