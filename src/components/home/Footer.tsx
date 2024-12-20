import Image from 'next/image';
import React from 'react';
import Logo from '@/assets/Logo/venom-wolf-logo1.png';
import Link from 'next/link';
import Whatsapp from '@/assets/social-media/whatsapp.png';
import LinkedIn from '@/assets/social-media/linkedin.png';
import Instagram from '@/assets/social-media/instagram.png';
const Footer = () => (
  <footer className="bg-[#000000] text-white py-8">
    <div className="customWidth mx-auto px-4">
      <div className="flex justify-between flex-wrap gap-8 items-center">
        {/* Logo and About Section */}
        <div className="md:w-[25%] text-center">
          <div className="mb-2">
            <Link href="/">
              {/* <Image src={Logo} className="  h-full w-full" alt="MarketNest" /> */}
              <div className="flex gap-2 items-center justify-center">
                <Image src={Logo} className=" h-auto w-36" alt="MarketNest" />{' '}
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
              href="tel:+919148140100"
              className="text-blue-500 hover:underline"
            >
              +91 9148140100
            </a>
          </p>
          <p>
            Email:{' '}
            <a
              href="mailto:info@venomwolf.com"
              className="text-blue-500 hover:underline"
            >
              info@venomwolf.com
            </a>
          </p>
          <p>Address: Kotur, muthsandra main road bangalore 560087</p>
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
