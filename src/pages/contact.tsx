import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Footer from '@/components/home/Footer';
import MailWolf from '@/assets/General/mail-wolf.png';
import PhoneWolf from '@/assets/General/phone-wolf.png';
import LocationWolf from '@/assets/General/location-wolf.png';
import Image from 'next/image';

const Contact: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div
          className="relative text-white"
          style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
        >
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(../assets/General/sub-bannerimage.png)',
            }}
          /> */}
          <div className="relative px-6 py-20 lg:py-32 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl font-bold md:text-6xl text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="mt-4 text-lg md:text-xl text-white"
            >
              Have a question? We&apos;d love to hear from you. Reach out to us
              below.
            </motion.p>
          </div>
        </div>

        {/* Contact Information and Form */}
        <div className="bg-white p-8 shadow-xl rounded-lg space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-6 bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="">
                  <Image
                    className="w-[140px] h-[140px] object-contain"
                    src={LocationWolf}
                    alt="Location Wolf"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Location:
                  </h3>
                  <p className="text-gray-600">KR Puram, Bangalore, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="">
                  <Image
                    className="w-[140px] h-[140px] object-contain"
                    src={PhoneWolf}
                    alt="Location Wolf"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Phone:
                  </h3>
                  <p className="text-gray-600">
                    (+91) 9876543210 <br />
                    (+91) 2345678901
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6 bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-lg transition-all">
                <div className="">
                  <Image
                    className="w-[140px] h-[140px] object-contain"
                    src={MailWolf}
                    alt="Location Wolf"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Email:
                  </h3>
                  <p className="text-gray-600">
                    info@artintelligence.com <br />
                    artintelligence@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 shadow-xl rounded-lg">
              <h2 className="text-3xl font-semibold text-gray-800">
                Need any Help?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Feel free to drop us a message. We are here to assist you with
                anything you need.
              </p>
              <form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-gray-800 font-semibold"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-gray-800 font-semibold"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-gray-800 font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-8">
            <iframe
              className="w-full h-96 border-0 rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.578881150644!2d77.69387531542595!3d12.973791790818619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e2b339e16b%3A0xd39a4e2b441ce684!2sKR%20Puram%2C%20Bengaluru%2C%20Karnataka%20560036!5e0!3m2!1sen!2sin!4v1692903740922!5m2!1sen!2sin"
              title="Our Location"
            />
          </div>
        </div>
      </div>

      <Footer />
    </MainLayout>
  );
};

export default Contact;
