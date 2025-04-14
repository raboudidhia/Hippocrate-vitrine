import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="w-full bg-[#1f1f1f] py-4 lg:py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:items-center sm:justify-center lg:flex-row lg:justify-between lg:items-center">
        <div className="flex items-center mb-6 lg:mb-0 sm:justify-center xs:justify-center ">
          <img className="w-[40px] h-[50px]" src={logo} alt=" logo" />
          <h1 className="ml-4 text-2xl lg:text-2xl font-semibold font-['Poppins']">
            Hippocrate
          </h1>
        </div>

        <div className="space-y-4 text-sm lg:text-base sm:text-center">
          <div className="flex items-center justify-center mr-20">
            <i className="fas fa-phone-alt text-[#1F8287] mr-5 "></i>
            <span>+216 98 269 561</span>
          </div>
          <div className="flex items-center justify-center mr-3">
            <i className="fas fa-envelope text-[#1F8287]  mr-2 ml-2"></i>
            <span>hippocratecsc@gmail.com</span>
          </div>
          <div className="flex items-center justify-center">
            <i className="fas fa-map-marker-alt text-[#1F8287]  mr-2"></i>
            <span>Bab Saadoune, Tunisia, 1029</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 text-center lg:text-left mt-6 lg:mt-0">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>
          <Link to="/services" className="hover:underline">
            Services
          </Link>
          <Link to="/reservation" className="hover:underline">
            Réserver
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        <div className="flex flex-col items-center mt-6 lg:mt-0">
          <span className="text-base lg:text-lg mb-4">Réseaux Sociaux</span>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100090343347795&mibextid=ZbWKwL"
              className="w-9 h-9 bg-[#1F8287]  rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors"
            >
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a
              href="https://www.instagram.com/hippocrate.officiel?igsh=MWU4ZGt1aHQ2NDRudw%3D%3D"
              className="w-9 h-9 bg-[#1F8287]  rounded-full flex items-center justify-center hover:bg-teal-500 transition-colors"
            >
              <i className="fab fa-instagram text-white"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;