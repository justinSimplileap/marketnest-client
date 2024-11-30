// src/pages/login.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import Image from 'next/image';
import Logo from '@/assets/Logo/jpmarket.png';
import LoginGif from '@/assets/General/Login.gif';

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <div className="grid grid-cols-2 h-full items-center ">
        <div className=" flex justify-center items-center">
          <motion.div
            className="bg-white p-8  max-w-md w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2">
              <Link href="/">
                <div className="flex gap-2 items-center w-full justify-center">
                  <Image src={Logo} className="h-20 w-20" alt="MarketNest" />
                  <span>|</span>
                  <span className="whitespace-nowrap">Market Nest</span>
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
            <form>
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
                  name="email"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                  required
                />
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
                  name="password"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </motion.div>

              {/* Login Button */}
              <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Log In
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
        <div className=" h-full bg-black flex justify-center items-center">
          <Image
            src={LoginGif}
            alt="LoginGif"
            priority
            className=" h-[100%] w-auto"
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
