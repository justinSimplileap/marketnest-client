// src/pages/signup.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginBanner from '@/assets/General/Signup.gif';
import Image from 'next/image';
import Logo from '@/assets/Logo/jpmarket.png';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Implement signup logic here
    console.log('Signing up with:', { email, password, confirmPassword });
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-2 h-full items-center ">
        <div className=" flex justify-center items-center">
          <motion.div
            className=" max-w-md w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-8 ">
              <div className="mb-2">
                <Link href="/">
                  <div className="flex gap-2 items-center w-full justify-center">
                    <Image src={Logo} className="h-20 w-20" alt="MarketNest" />
                    <span>|</span>
                    <span className="whitespace-nowrap">Market Nest</span>
                  </div>
                </Link>
              </div>
              <h2 className="text-2xl font-semibold mb-6 text-center">
                Sign Up
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                onClick={handleSignup}
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Sign Up
              </button>

              <div className="mt-4 text-center">
                <Link href="/login" className="text-blue-500 hover:underline">
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        <div className=" h-full bg-black flex justify-center items-center">
          <Image
            src={LoginBanner}
            alt="Login banner"
            priority
            className="h-[80%] w-auto "
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
