import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from './animation';
import iphone from '@/assets/deals/iphone15.png';
import samsung from '@/assets/deals/samsungs23.png';
import pixel from '@/assets/deals/pixel-8.jpeg';
import oneplus from '@/assets/deals/oneplus11.png';
import Image from 'next/image';

const smartphones = [
  { id: 1, name: 'iPhone 15', image: iphone, price: '499' },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    image: samsung,
    price: '399',
  },
  { id: 3, name: 'OnePlus 11', image: oneplus, price: '549' },
  { id: 4, name: 'Google Pixel 8', image: pixel, price: '599' },
];

const BestDealsSection = () => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('best-deals-section');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <motion.section
      id="best-deals-section"
      className="py-10  customWidth"
      variants={fadeIn('up', 'spring', 0.2, 0.8)}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Best Deals on Smartphones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {smartphones.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{
                scale: 1.05,
                rotateY: 15,
                boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.2)',
                transition: { type: 'spring', stiffness: 300, damping: 30 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.2 },
              }}
            >
              <div className="relative h-56 w-full">
                <motion.div
                  className="absolute inset-0"
                  //   whileHover={{ scale: 1.1 }} // Zoom image when hovered
                  //   transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="transform transition-all duration-300"
                  />
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">
                  Starts from ${product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BestDealsSection;
