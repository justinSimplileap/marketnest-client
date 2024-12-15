import ProtectedAxiosInstance from '../ProtectedAxiosInstance';

export const addAddress = async (address: {
  name: string;
  phoneNumber: string;
  pincode: string;
  flatHouseBuilding: string;
  areaStreetSectorVillage: string;
  landmark: string | null;
  townCity: string;
  state: string;
  country: string;
}) => {
  const response = await ProtectedAxiosInstance.post('/address/add', address);
  return response.data;
};

export const getAddresses = async () => {
  const response = await ProtectedAxiosInstance.get('/address/');
  return response.data;
};

export const updateAddress = async (
  addressId: number,
  pincode: string,
  flatHouseBuilding: string,
  areaStreetSectorVillage: string,
  landmark: string | null,
  townCity: string,
  state: string,
  country: string = 'India'
) => {
  const response = await ProtectedAxiosInstance.put(
    `/address/update/${addressId}`,
    {
      pincode,
      flatHouseBuilding,
      areaStreetSectorVillage,
      landmark,
      townCity,
      state,
      country,
    }
  );
  return response.data;
};

// Delete a shipping address
export const deleteAddress = async (addressId: number) => {
  const response = await ProtectedAxiosInstance.delete(
    `/address/delete/${addressId}`
  );
  return response.data;
};
