import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import DefaultImage from '../../assets/profile/profile-picture.png';
import { useRouter } from 'next/router';

const TopbarUserMenu: React.FC = () => {
  const { user } = useAppContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (path: string) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="focus:outline-none"
      >
        <Image
          className=" h-16 w-auto drop-shadow-lg rounded-full object-cover object-center"
          src={user?.avatarUrl || DefaultImage}
          alt="Profile"
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
          <ul className="py-2">
            {/* <li
              onClick={() => handleNavigation('/profile')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </li> */}
            <li
              onClick={() => handleNavigation('/orders')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Orders
            </li>
            {/* <li
              onClick={() => handleNavigation('/settings')}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Settings
            </li> */}
            <li
              onClick={() => handleNavigation('/logout')}
              className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopbarUserMenu;
