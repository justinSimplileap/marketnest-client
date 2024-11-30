import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { toast } from 'react-hot-toast';
import { getCategories } from '@/services/api/productApi';

interface Category {
  id: number;
  name: string;
}

// Framer Motion variants for animations
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 30,
    },
  },
};
import MobileImage from '@/assets/categories/mobile.png';
import LaptopImage from '@/assets/categories/laptop.jpg';
import EarphoneImage from '@/assets/categories/TWS.png';
import WatchImage from '@/assets/categories/smart-watch.png';
import AccessoryImage from '@/assets/categories/accessories.png';
import { useRouter } from 'next/router';

const categoryImages: Record<string, StaticImageData> = {
  'Smart phones': MobileImage,
  Laptop: LaptopImage,
  'Wireless Earphone': EarphoneImage,
  'Smart Watch': WatchImage,
  'Mobile Accessory': AccessoryImage,
};

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch categories');
          toast.error(err.message || 'Failed to fetch categories');
        } else {
          setError('Failed to fetch categories');
          toast.error('Failed to fetch categories');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/products?categoryId=${categoryId}`);
  };

  if (loading) {
    return (
      <section className="py-10 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Loading Categories...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Failed to load categories.
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">
          Shop by Category
        </h2>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center"
          initial="hidden"
          whileInView="show"
          variants={fadeIn}
          viewport={{ once: true }}
        >
          {categories?.map((category: { id: number; name: string }, index) => (
            <motion.div
              key={category.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col items-center text-center p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              initial="hidden"
              whileInView="show"
              onClick={() => handleCategoryClick(category.id)}
              variants={scaleUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative h-32  w-full mb-3 flex ">
                <Image
                  src={categoryImages[category.name] || '/assets/default.png'}
                  alt={category.name}
                  layout="intrinsic"
                  className=" !w-full !h-full !object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
