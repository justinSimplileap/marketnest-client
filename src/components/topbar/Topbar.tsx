import { useState, useEffect } from 'react';
import Link from 'next/link';
// import TopbarNotifications from './TopbarNotifications';
import TopbarSearch from './TopbarSearch';
import TopbarUserMenu from './TopbarUserMenu';
import Image from 'next/image';
import Logo from '@/assets/Logo/jpmarket.png';
import Cart from '@/assets/Logo/cart.svg';
import { useCartContext } from '@/context/CartContext';

const Topbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCartContext();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Update cartItemCount whenever the cart changes
  useEffect(() => {
    setCartItemCount(cart.reduce((sum, item) => sum + (item.stock || 1), 0));

    // Trigger animation for 1 second whenever cartItemCount changes
    if (cartItemCount > 0) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [cart]); // Only depend on cart, not cartItemCount

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Scrolling down and past a threshold
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`custom-shadow sticky top-0 z-50 bg-white transition-transform duration-300 ${
        isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
      }`}
    >
      <header className="flex items-center justify-between px-4 py-2 customWidth">
        {/* Logo */}
        <div className="">
          <Link href="/">
            <div className="flex gap-2 items-center">
              <Image src={Logo} className="h-16 w-16" alt="MarketNest" />
              <span>|</span>
              <span className="whitespace-nowrap">Market Nest</span>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex gap-10 font-medium text-base">
          <Link
            href="/"
            className="hover:text-gray-500 dark:hover:text-gray-300"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-500 dark:hover:text-gray-300"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-500 dark:hover:text-gray-300"
          >
            About
          </Link>
          <Link
            href="/login"
            className="hover:text-gray-500 dark:hover:text-gray-300"
          >
            Login
          </Link>
        </nav>

        <div className="hidden sm:flex w-[400px]">
          <TopbarSearch />
        </div>

        {/* Right Section (Search, Notifications, User Menu, Cart) */}
        <div className="flex items-center space-x-4">
          {/* <TopbarNotifications /> */}
          {/* Bag/Cart Icon */}
          <div className="relative">
            <Link href="/cart">
              <Image src={Cart} className=" h-8 w-8" alt="Cart" />
            </Link>
            {/* Cart Item Count Badge */}
            {cartItemCount > 0 && (
              <span
                className={`absolute top-[-10px] right-[-10px] text-xs bg-red-600 text-white rounded-full px-[6px] py-[2px] transition-all ${
                  isAnimating ? 'animate-bounce' : ''
                }`}
              >
                {cartItemCount}
              </span>
            )}
          </div>
          <TopbarUserMenu />

          {/* Mobile Menu Icon */}
          <div className="sm:hidden">
            <button
              className="text-xl cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md sm:hidden">
            <div className="p-4 border-b">
              <TopbarSearch />
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              <Link
                href="/"
                className="hover:text-gray-500 dark:hover:text-gray-300"
              >
                Home
              </Link>
              <Link
                href="/deals"
                className="hover:text-gray-500 dark:hover:text-gray-300"
              >
                Deals
              </Link>
              <Link
                href="/contact"
                className="hover:text-gray-500 dark:hover:text-gray-300"
              >
                Contact
              </Link>
              <Link
                href="/about"
                className="hover:text-gray-500 dark:hover:text-gray-300"
              >
                About
              </Link>
              <Link
                href="/signup"
                className="hover:text-gray-500 dark:hover:text-gray-300"
              >
                Signup
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Topbar;
