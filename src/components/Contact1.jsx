import { Link } from "react-router-dom";
import { hipp9 } from "../assets";

export const Contact1 = () => {
  return (
    <div className="w-full h-[737px] sm:h-[500px] md:h-[600px] lg:h-[850px] relative bg-black">
      <img
        src={hipp9}
        alt="Coworking space with modern and dynamic design"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-white p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center h-full gap-4 lg:ml-9 lg:pt-[10%] xs:pt-[30%] md:pt-[20%] ">
        <h1 className="text-[30px] sm:text-[40px] md:text-[60px] lg:text-[80px] font-normal  font-['Poppins'] capitalize leading-tight">
          CONTACTEZ-NOUS
        </h1>
        <p className="mt-2 text-sm sm:text-base font-normal font-['Poppins'] md:text-lg lg:text-2xl">
          Besoin d&apos;informations ou envie de réserver votre espace ?
          Contactez-nous, et <br className="hidden lg:block" /> notre équipe se
          fera un plaisir de vous répondre dans les plus brefs délais !
        </p>
         <div className="mt-6 flex flex-col sm:flex-row gap-4 lg:gap-9 lg:ml-5">
           <a
             href="#contact"
             className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20   bg-[#1f8287] text-white text-center rounded-md shadow-md  font-semibold font-['Poppins'] cursor-pointer hover:bg-[#176e72] transition-all"
           >
             Contact
           </a>
           <Link
             to="/services"
             className="w-full sm:w-auto px-6 py-3 lg:px-24 lg:py-4 md:px-20 border border-white text-white text-center  font-semibold font-['Poppins'] rounded-md shadow-md cursor-pointer hover:bg-white hover:text-[#1f8287] transition-all"
          >
            Nos services
          </Link>
        </div>
      </div>
    </div>
  );
};
