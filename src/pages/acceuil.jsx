import hipp2 from "../assets/hipp2.jpg";
import hipp3 from "../assets/hipp3.jpg";
import hipp1 from "../assets/hipp1.jpg";

// Import Swiper.js
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const Acceuil = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="w-full h-[737px]"
    >
      <SwiperSlide>
        <div className="w-full h-[737px] relative bg-black">
          <img
            src={hipp2}
            alt="Coworking space with modern and dynamic design"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-white p-8">
            <h1 className="w-[958px] h-[163.40px] left-[83px] top-[305.73px] absolute text-white text-[80px] font-normal font-['Poppins'] capitalize leading-[82px] tracking-tight">
              Bienvenue Chez L’Hippocrate
            </h1>
            <p className="w-[958px] h-[81.70px] left-[83px] top-[490px] absolute text-white text-2xl font-normal font-['Poppins'] leading-relaxed tracking-tight">
              Un espace de coworking moderne et dynamique conçu pour les
              <br />
              étudiants de toutes disciplines.
            </p>
            <div className="absolute left-[115px] top-[600px] flex gap-10">
              <div
                onClick={() => (window.location.href = "#contact")}
                className="w-[331.41px] h-[64.07px] bg-[#1f8287] flex items-center justify-center cursor-pointer"
              >
                <p className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide">
                  Contact
                </p>
              </div>

              <div
                onClick={() => (window.location.href = "#services")}
                className="w-[331.41px] h-[64.07px] bg-[#00adb5]/0 rounded-[3px] border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <p className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide">
                  Nos services
                </p>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="w-full h-[737px] relative bg-black">
          <img
            src={hipp3}
            alt="Slide 2"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-white p-8">
            <h1 className="w-[970px] h-[163.40px] left-[83px] top-[305.73px] absolute text-white text-[80px] font-normal font-['Poppins'] capitalize leading-[82px] tracking-tight">
              Confort et productivité au cœur de votre réussite
            </h1>
            <p className="w-[958px] h-[81.70px] left-[90px] top-[490px] absolute text-white text-2xl font-normal font-['Poppins'] leading-relaxed tracking-tight">
              Profitez d’un environnement moderne, équipé et convivial, parfait
              pour étudier collaborer et atteindre vos objectifs.
            </p>
            <div className="absolute left-[115px] top-[600px] flex gap-10">
              <div
                onClick={() => (window.location.href = "#contact")}
                className="w-[331.41px] h-[64.07px] bg-[#1f8287] flex items-center justify-center cursor-pointer"
              >
                <p className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide">
                  Contact
                </p>
              </div>

              <div
                onClick={() => (window.location.href = "#services")}
                className="w-[331.41px] h-[64.07px] bg-[#00adb5]/0 rounded-[3px] border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <p className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide">
                  Nos services
                </p>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="w-full h-[737px] relative bg-black">
          <img
            src={hipp1}
            alt="Slide 3"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-white p-8">
            <h1 className="w-[1100px] h-[163.40px] left-[83px] top-[305.73px] absolute text-white text-[80px] font-normal font-['Poppins'] capitalize leading-[82px] tracking-tight">
              Votre partenaire idéal pour travailler, créer et innover
            </h1>
            <p className="w-[958px] h-[81.70px] left-[95px] top-[490px] absolute text-white text-2xl font-normal font-['Poppins'] leading-relaxed tracking-tight">
              Un lieu moderne et convivial pour étudier, collaborer et réussir
              avec une connexion à haut débit.
            </p>
            <div className="absolute left-[115px] top-[600px] flex gap-10">
              {/* Div englobante pour les boutons, ajout de la redirection ici */}
              <div
                onClick={() => (window.location.href = "#contact")}
                className="w-[331.41px] h-[64.07px] bg-[#1f8287] flex items-center justify-center cursor-pointer"
              >
                <p className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide">
                  Contact
                </p>
              </div>

              <div
                onClick={() => (window.location.href = "#services")}
                className="w-[331.41px] h-[64.07px] bg-[#00adb5]/0 rounded-[3px] border-2 border-white flex items-center justify-center cursor-pointer"
              >
                <p className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide">
                  Nos services
                </p>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Acceuil;
