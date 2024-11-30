import { useRouter } from 'next/router';
import { useState } from 'react';
import Footer from '@/components/home/Footer';
import MainLayout from '@/components/layout/MainLayout';

interface CartItem {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ShippingDetails {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  mobileNumber: string;
  flatAddress: string;
  areaStreet: string;
  landmark: string;
  townCity: string;
  state: string;
}

const Checkout: React.FC = () => {
  const router = useRouter();
  const { cart } = router.query;

  const parsedCart: CartItem[] = cart ? JSON.parse(cart as string) : [];

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    mobileNumber: '',
    flatAddress: '',
    areaStreet: '',
    landmark: '',
    townCity: '',
    state: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Shipping Details:', shippingDetails);
    console.log('Order Details:', parsedCart);
  };

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
      <div className="customWidth mx-auto py-10 px-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">Checkout</h1>

        <div className="flex space-x-10">
          {/* Order Details */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-semibold">Order Details</h2>
            {parsedCart.length > 0 ? (
              parsedCart.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <p>{item.name}</p>
                  <p>
                    {formatCurrency(item.price)} x {item.stock}
                  </p>
                </div>
              ))
            ) : (
              <p>No items in the cart</p>
            )}

            <div className="border-t pt-4">
              <p className="text-xl font-semibold">
                Total:{' '}
                {formatCurrency(
                  parsedCart.reduce(
                    (total, item) => total + item.price * item.stock,
                    0
                  )
                )}
              </p>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {/* Full Name */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shippingDetails.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />

              {/* Mobile Number */}
              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile number"
                value={shippingDetails.mobileNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />

              {/* Pincode */}
              <input
                type="text"
                name="postalCode"
                placeholder="Pincode"
                value={shippingDetails.postalCode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />

              {/* Flat Address */}
              <input
                type="text"
                name="flatAddress"
                placeholder="Flat, House no., Building, Company, Apartment"
                value={shippingDetails.flatAddress}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />

              {/* Area/Street */}
              <input
                type="text"
                name="areaStreet"
                placeholder="Area, Street, Sector, Village"
                value={shippingDetails.areaStreet}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />

              {/* Landmark */}
              <input
                type="text"
                name="landmark"
                placeholder="Landmark (e.g., near Apollo hospital)"
                value={shippingDetails.landmark}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />

              {/* Town/City */}
              <input
                type="text"
                name="townCity"
                placeholder="Town/City"
                value={shippingDetails.townCity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              />

              {/* State */}
              <select
                name="state"
                value={shippingDetails.state}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              >
                <option value="">Choose a state</option>
                <option value="Karnataka">Karnataka</option>
                {/* Add more states as needed */}
              </select>

              {/* Country */}
              <select
                name="country"
                value={shippingDetails.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300"
                required
              >
                <option value="India">India</option>
                {/* Add more countries as needed */}
              </select>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Address
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
};

export default Checkout;
