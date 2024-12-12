import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import {
  hipp1,
  hipp2,
  hipp3,
  hipp4,
  hipp5,
  hipp6,
  hipp7,
  hipp8,
  hipp9,
  hipp10,
} from "../assets";

const ImagesSwiper = () => {
  const images = [
    hipp1,
    hipp2,
    hipp3,
    hipp4,
    hipp5,
    hipp6,
    hipp7,
    hipp8,
    hipp9,
    hipp10,
  ];

  return (

    
    <div className="w-full max-w-4xl mx-auto mt-10">
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-72 h-72 object-cover rounded-xl transition-transform duration-500"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImagesSwiper;