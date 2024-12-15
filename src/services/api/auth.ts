/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast';
import AxiosInstance from '../ApiRequests';

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await AxiosInstance.post('/auth/userLogin', data);
    const { token } = response.data;

    localStorage.setItem('token', token);

    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Login failed. Please try again.';
    toast.error(errorMessage);
    console.error('Login error:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const signup = async (data: {
  userName: string;
  email: string;
  password: string;
  role: string;
  confirmPassword: string;
}) => {
  try {
    const response = await AxiosInstance.post('/auth/usersignup', data);
    const { token } = response.data;

    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const verifyUser = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found. Please log in again.');
    }

    const response = await AxiosInstance.post('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // Return user data if successful
  } catch (error) {
    console.log('Error', error);
    throw new Error('An unexpected error occurred. Please try again.');
  }
};

// export const getUser = async () => {
//   try {
//     const response = await ProtectedAxiosInstance.get('/auth/getUser');
//     return response?.data;
//   } catch (error: any) {
//     toast.error('error', error);
//   }
// };
