import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Footer from '@/components/home/Footer';
import AI from '../assets/General/sub-bannerimage.png';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <div
          className="relative text-white"
          style={{ background: 'linear-gradient(135deg, #111111, #000000)' }}
        >
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="absolute right-[-20%] top-[20%] bg-opacity-50 bg-cover bg-center"
          >
            <Image src={AI} alt="ai" className="object-cover w-full h-full" />
          </motion.div>
          <div className="relative px-6 py-20 lg:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-4xl font-bold tracking-tight md:text-6xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"
              >
                About Our Store
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mt-4 text-lg md:text-xl w-[50%] mx-auto"
              >
                We bring quality and passion into every product we offer,
                helping customers experience the best in shopping.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Mission and Values Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="py-16 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h2>
                <p className="mt-4 text-gray-600">
                  At Venom wolf, our mission is to deliver top-quality products
                  while fostering trust and reliability with every transaction.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Our Values</h2>
                <p className="mt-4 text-gray-600">
                  We are driven by innovation, sustainability, and customer
                  satisfaction, striving to make a difference in the e-commerce
                  world.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="py-16 bg-white"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl font-bold text-center text-gray-800"
            >
              Meet Our Team
            </motion.h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((member) => (
                <motion.div
                  key={member}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <div className="h-40 w-40 mx-auto rounded-full bg-gray-300"></div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-800">
                    Name
                  </h3>
                  <p className="mt-2 text-gray-600">Position</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="py-16 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-3xl font-bold text-center text-gray-800"
            >
              What Our Customers Say
            </motion.h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((testimonial) => (
                <motion.div
                  key={testimonial}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="p-6 bg-white rounded-lg shadow-lg"
                >
                  <p className="text-gray-600">
                    &quot;This is the best shopping experience I&apos;ve ever
                    had! The quality and service are unparalleled.&quot;
                  </p>
                  <h3 className="mt-4 font-bold text-gray-800">
                    - Customer Name
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </MainLayout>
  );
};

export default About;
