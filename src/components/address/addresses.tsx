import { addAddress, getAddresses } from '@/services/api/address';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

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

interface AddressesProps {
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<ShippingDetails | null>
  >; // Add this line
}

const Addresses: React.FC<AddressesProps> = ({ setSelectedAddress }) => {
  const [addresses, setAddresses] = useState<ShippingDetails[]>([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<
    number | null
  >(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ShippingDetails>();

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addressData = await getAddresses();

        if (addressData?.status === 'success') {
          const fetchedAddresses = addressData?.data?.addresses;
          setAddresses(fetchedAddresses);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log('error', error);
        toast.error(
          error?.response?.data?.message || 'Failed to fetch addresses'
        );
      }
    };
    fetchAddress();
  }, [setValue]);

  const onSubmit = async (data: ShippingDetails) => {
    console.log('data', data);
    try {
      await addAddress(data);
      toast.success('Address added successfully');
      setShowForm(false);
      setAddresses([...addresses, data]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Failed to add address', error);
    }
  };

  return (
    <div className="space-y-4 col-span-2">
      {addresses.length > 0 && !showForm ? (
        <div className=" ">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4 items-center">
              <p className=" h-10 w-10 border rounded-full flex justify-center items-center">
                01
              </p>
              <p className=" text-2xl font-semibold"> Address</p>
            </div>
            <button
              className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
              onClick={() => setShowForm(true)}
            >
              Add New Address
            </button>
          </div>

          {addresses.map((address, index) => (
            <div
              key={index}
              className={`border-2 p-4 rounded shadow-md hover:shadow-lg transition duration-300 ${
                selectedAddressIndex === index ? 'border-blue-800' : ''
              }`}
            >
              <p className="font-semibold">{address.name}</p>
              <p>
                {address.flatHouseBuilding}, {address.areaStreetSectorVillage}
              </p>
              <p>
                {address.townCity}, {address.state} - {address.pincode}
              </p>
              <p>{address.country}</p>
              <p>Phone: {address.phoneNumber}</p>
              <div className="mt-2 flex space-x-4">
                <button
                  className="py-1 px-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => {
                    setSelectedAddress(address);
                    setSelectedAddressIndex(index);
                  }}
                >
                  Use This Address
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <h2 className="text-2xl font-semibold">Shipping Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              {...register('name', { required: 'Full name is required' })}
              className="w-full p-2 border border-gray-300"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            {/* Mobile Number */}
            <input
              type="text"
              placeholder="Mobile number"
              {...register('phoneNumber', {
                required: 'Mobile number is required',
              })}
              className="w-full p-2 border border-gray-300"
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}

            {/* Pincode */}
            <input
              type="text"
              placeholder="Pincode"
              {...register('pincode', {
                required: 'Pincode is required',
              })}
              className="w-full p-2 border border-gray-300"
            />
            {errors.pincode && (
              <p className="text-red-500">{errors.pincode.message}</p>
            )}

            {/* Flat Address */}
            <input
              type="text"
              placeholder="Flat, House no., Building, Company, Apartment"
              {...register('flatHouseBuilding', {
                required: 'Flat Address is required',
              })}
              className="w-full p-2 border border-gray-300"
            />
            {errors.flatHouseBuilding && (
              <p className="text-red-500">{errors.flatHouseBuilding.message}</p>
            )}

            {/* Area/Street */}
            <input
              type="text"
              placeholder="Area, Street, Sector, Village"
              {...register('areaStreetSectorVillage', {
                required: 'Area/Street is required',
              })}
              className="w-full p-2 border border-gray-300"
            />
            {errors.areaStreetSectorVillage && (
              <p className="text-red-500">
                {errors.areaStreetSectorVillage.message}
              </p>
            )}

            {/* Landmark */}
            <input
              type="text"
              placeholder="Landmark (e.g., near Apollo hospital)"
              {...register('landmark', {
                required: 'Landmark is required',
              })}
              className="w-full p-2 border border-gray-300"
            />
            {errors.landmark && (
              <p className="text-red-500">{errors.landmark.message}</p>
            )}

            {/* Town/City */}
            <input
              type="text"
              placeholder="Town/City"
              {...register('townCity', {
                required: 'Town/City is required',
              })}
              className="w-full p-2 border border-gray-300"
            />
            {errors.townCity && (
              <p className="text-red-500">{errors.townCity.message}</p>
            )}

            {/* State */}
            <select
              {...register('state', { required: 'State is required' })}
              className="w-full p-2 border border-gray-300"
            >
              <option value="">Choose a state</option>
              <option value="Karnataka">Karnataka</option>
              {/* Add more states as needed */}
            </select>
            {errors.state && (
              <p className="text-red-500">{errors.state.message}</p>
            )}

            {/* Country */}
            <select
              {...register('country', {
                required: 'Country is required',
              })}
              className="w-full p-2 border border-gray-300"
            >
              <option value="India">India</option>
              {/* Add more countries as needed */}
            </select>
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
            <div className="flex gap-4 items-center">
              <button
                type="submit"
                className=" w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Address
              </button>

              {addresses.length > 0 ? (
                <button
                  className=" w-full py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              ) : (
                ' '
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Addresses;
