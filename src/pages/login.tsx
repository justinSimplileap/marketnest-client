import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import Image from 'next/image';
import Logo from '@/assets/Logo/venom-wolf-logo1.png';
import LoginGif from '@/assets/General/Login.gif';
import { useForm } from 'react-hook-form';
import { login } from '@/services/api/auth';
import LocalStorageService from '@/services/LocalStorageService';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data);
      if (response.status === 'success') {
        const { token, jpid } = response.data;

        LocalStorageService.setToken(token);
        LocalStorageService.setItem('jpid', jpid);

        router.push('/');
      } else {
        setErrorMessage(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 md:grid-cols-2  h-full items-center">
        <div className="flex justify-center items-center">
          <motion.div
            className="bg-white p-8 max-w-md w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <Link href="/">
                <div className="flex gap-2 items-center w-full justify-center">
                  <Image src={Logo} className="h-20 w-auto" alt="MarketNest" />
                </div>
              </Link>
            </div>
            <h2 className="text-3xl font-semibold text-center mb-6">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-center mb-8">
              Please enter your details to login
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`mt-1 p-2 w-full border rounded-md focus:ring-2 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className={`mt-1 p-2 w-full border rounded-md focus:ring-2 ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>

              {errorMessage && (
                <p className="text-red-500 text-sm text-center mt-4">
                  {errorMessage}
                </p>
              )}

              {/* Login Button */}
              <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </motion.button>
            </form>

            {/* Additional Links */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <Link href="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
              <Link href="/signup" className="hover:underline">
                Sign up
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="h-full bg-black flex justify-center items-center">
          <Image
            src={LoginGif}
            alt="LoginGif"
            priority
            className="h-[100%] w-auto"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
