import React from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    name: 'Fast & Free Delivery',
    icon: '🚚',
    description: 'Enjoy free and fast delivery on all orders!',
  },
  {
    id: 2,
    name: '24/7 Customer Support',
    icon: '💬',
    description: 'Our team is always available to assist you.',
  },
  {
    id: 3,
    name: 'Easy Returns & Exchanges',
    icon: '🔄',
    description: 'Return or exchange products with no hassle.',
  },
  {
    id: 4,
    name: 'Secure Payments',
    icon: '🔒',
    description: 'We provide a safe and secure checkout experience.',
  },
  {
    id: 5,
    name: 'Exclusive Deals & Offers',
    icon: '🎁',
    description: 'Get access to amazing discounts and special deals.',
  },
  {
    id: 6,
    name: 'Quality Assurance',
    icon: '✅',
    description: 'All our products go through a rigorous quality check.',
  },
];

const Services = () => (
  <section className="py-10 bg-[#f8f9fa] ">
    <div className="container mx-auto px-4 customWidth">
      <h2 className="text-3xl font-bold text-center mb-8">Why Shop With Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }} // Animation triggers when 50% of the component is in view
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              delay: 0.2 * service.id, // Staggered delay for each service
            }}
          >
            <div className="text-4xl text-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-center mt-4">
              {service.name}
            </h3>
            <p className="text-gray-600 text-center mt-2">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
