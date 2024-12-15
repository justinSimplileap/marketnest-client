// src/components/Banner.tsx
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import your images
import Banner1 from '@/assets/General/banner1.png';
import Banner2 from '@/assets/General/banner2.png';
import Banner3 from '@/assets/General/banner3.png';
import Banner4 from '@/assets/General/banner4.png';

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
        <SwiperSlide>
          <Image
            src={Banner3}
            alt="Banner 3"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="w-full h-full"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Banner4}
            alt="Banner 4"
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
