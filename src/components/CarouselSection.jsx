import hipp2 from "../assets/hipp2.jpg";
import hipp3 from "../assets/hipp3.jpg";
import hipp1 from "../assets/hipp1.jpg";
import {Link} from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const Acceuil = () => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="w-full h-[737px] sm:h-[500px] md:h-[600px] lg:h-[850px]"
      >
        <SwiperSlide>
          <div className="w-full h-full relative bg-black">
            <img
              src={hipp2}
              alt="Coworking space with modern and dynamic design"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center h-full gap-4 lg:ml-9 lg:pt-[10%] xs:pt-[30%] md:pt-[20%] ">
              <h1 className="text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] font-normal  font-['Poppins'] capitalize leading-tight">
                Bienvenue Chez <br className="hidden lg:block" />
                L’Hippocrate
              </h1>

              <p className="mt-2 text-sm sm:text-base font-normal   font-['Poppins']  md:text-lg lg:text-2xl">
                Un espace de coworking moderne et dynamique conçu pour les
                <br className="hidden lg:block" /> étudiants de toutes disciplines.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 lg:gap-9 lg:ml-5">
                <Link
                  to= "/contact"
                  className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20   bg-[#1f8287] text-white text-center rounded-md shadow-md  font-semibold font-['Poppins'] cursor-pointer hover:bg-[#176e72] transition-all"
                >
                  Contact
                </Link>
                <Link
                  to= "/services"
                  className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20 border border-white text-white text-center  font-semibold font-['Poppins'] rounded-md shadow-md cursor-pointer hover:bg-white hover:text-[#1f8287] transition-all"
                >
                  Nos services
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full relative bg-black">
            <img
              src={hipp3}
              alt="Slide 2"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center h-full gap-4 lg:ml-9 lg:pt-[10%] xs:pt-[30%] md:pt-[20%]">
              <h1 className="text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] font-normal  font-['Poppins'] capitalize leading-tight">
                Confort et productivité au <br className="hidden lg:block" />
                cœur de votre réussite
              </h1>
              <p className="mt-2 text-sm sm:text-base font-normal   font-['Poppins']  md:text-lg lg:text-2xl">
                Profitez d’un environnement moderne, équipé et convivial,
                parfait pour <br className="hidden lg:block" />
                étudier, collaborer et atteindre vos objectifs.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 lg:gap-9 lg:ml-5">
                <div
                  onClick={() => (window.location.href = "/contact")}
                  className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20   bg-[#1f8287] text-white text-center rounded-md shadow-md  font-semibold font-['Poppins'] cursor-pointer hover:bg-[#176e72] transition-all"
                >
                  Contact
                </div>
                <div
                  onClick={() => (window.location.href = "/services")}
                  className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20 border border-white text-white text-center  font-semibold font-['Poppins'] rounded-md shadow-md cursor-pointer hover:bg-white hover:text-[#1f8287] transition-all"
                >
                  Nos services
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-full relative bg-black">
            <img
              src={hipp1}
              alt="Slide 3"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center h-full gap-4 lg:ml-9 lg:pt-[10%] xs:pt-[30%] md:pt-[20%]">
              <h1 className="text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] font-normal  font-['Poppins'] capitalize leading-tight">
                Votre partenaire idéal pour travailler, créer et innover
              </h1>
              <p className="mt-2 text-sm sm:text-base font-normal   font-['Poppins']  md:text-lg lg:text-2xl">
                Un lieu moderne et convivial pour étudier, collaborer et réussir
                avec une <br className="hidden lg:block" /> connexion à haut débit.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 lg:gap-9 lg:ml-5">
                <div
                  onClick={() => (window.location.href = "/contact")}
                  className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20   bg-[#1f8287] text-white text-center rounded-md shadow-md  font-semibold font-['Poppins'] cursor-pointer hover:bg-[#176e72] transition-all"
                >
                  Contact
                </div>
                <div
                  onClick={() => (window.location.href = "/services")}
                  className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20 border border-white text-white text-center  font-semibold font-['Poppins'] rounded-md shadow-md cursor-pointer hover:bg-white hover:text-[#1f8287] transition-all"
                >
                  Nos services
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Acceuil;


