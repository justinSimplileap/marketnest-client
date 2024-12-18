// src/components/Banner.tsx
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import your images
import Banner1 from '@/assets/General/2151833076.jpg';
import Banner2 from '@/assets/General/2151833112.jpg';

const Banner = () => {
  return (
    <div className=" lg:h-[70vh] h-[40vh] w-full p-6 ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="h-full w-full rounded-lg"
      >
        <SwiperSlide>
          <Image
            src={Banner1}
            alt="Banner 1"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Banner2}
            alt="Banner 2"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
