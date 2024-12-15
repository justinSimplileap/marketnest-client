// src/pages/signup.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import LoginBanner from '@/assets/General/Signup.gif';
import Image from 'next/image';
import Logo from '@/assets/Logo/venom-wolf-logo1.png';
import { useState } from 'react';
import { signup } from '@/services/api/auth';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const Signup = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error('Email and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password doesn't match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        userName: user,
        email,
        password,
        confirmPassword,
        role: 'user',
      });

      toast.success('Signup successful!');
      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes('Duplicate field value')) {
          toast.error('Email already in use. Please choose another.');
        } else {
          toast.error('Signup failed. Please try again.');
        }
      } else {
        toast.error('Network error. Please check your connection.');
      }
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center ">
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
                    <Image
                      src={Logo}
                      className="h-20 w-auto"
                      alt="MarketNest"
                    />
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
                  UserName
                </label>
                <input
                  id="name"
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

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
                {isLoading ? 'Signing Up...' : 'Sign Up'}
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
