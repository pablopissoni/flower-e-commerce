"use client";
import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

interface MyCSSProperties extends React.CSSProperties {
  "--swiper-navigation-color"?: string;
  "--swiper-pagination-color"?: string;
}
interface Props {
  images: string[];
  title: string;
  // className?: string;
}

export const ProductSlideshow = ({ images, title }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as MyCSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper,
          // swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            {/* <img src={image} /> */}
            <Image
              src={`/products/${image}`}
              className="rounded-lg object-fill"
              alt={title}
              width={1024}
              height={800}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            {/* <img src={image} /> */}
            <Image src={`/products/${image}`} alt={title} width={200} height={100} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
