import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/Logo/jpmarket.png';
import Link from 'next/link';
import Whatsapp from '@/assets/social-media/whatsapp.png';
import LinkedIn from '@/assets/social-media/linkedin.png';
import Instagram from '@/assets/social-media/instagram.png';
const Footer = () => (
  <footer className="bg-[#000000] text-white py-8">
    <div className="customWidth mx-auto px-4">
      <div className="flex justify-between flex-wrap gap-8 items-center">
        {/* Logo and About Section */}
        <div className="w-[25%]">
          <div className="">
            <Link href="/">
              {/* <Image src={Logo} className="  h-full w-full" alt="MarketNest" /> */}
              <div className="flex gap-2 items-center">
                <Image src={Logo} className=" h-28 w-28" alt="MarketNest" />{' '}
                <span>|</span>
                <span className=" whitespace-nowrap">Market Nest</span>
              </div>
            </Link>
          </div>
          <p>
            Your one-stop solution for the best shopping experience. We bring
            top-notch products to your doorstep.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>
            Phone:{' '}
            <a
              href="tel:+919108264719"
              className="text-blue-500 hover:underline"
            >
              +91 9108264719
            </a>
          </p>
          <p>
            Email:{' '}
            <a
              href="mailto:justinjjp36@gmail.com"
              className="text-blue-500 hover:underline"
            >
              justinjjp36@gmail.com
            </a>
          </p>
          <p>Address: 123 Main Street, City, Country</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-blue-600">
              <Image src={Whatsapp} alt="icon" width={30} height={30} />
            </a>
            <a href="#" className="text-2xl hover:text-blue-400">
              <Image src={LinkedIn} alt="icon" width={30} height={30} />
            </a>
            <a href="#" className="text-2xl hover:text-pink-500">
              <Image src={Instagram} alt="icon" width={30} height={30} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} MarketNext. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
