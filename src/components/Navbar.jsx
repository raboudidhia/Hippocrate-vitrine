import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { IoMdClose, IoMdMenu } from "react-icons/io";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isSolid, setIsSolid] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Fixed navbar logic when scrolling past 80% of the viewport height
            if (currentScrollY > window.innerHeight * 0.8 && !isFixed) {
                setIsFixed(true);
            } else if (currentScrollY <= window.innerHeight * 0.8 && isFixed) {
                setIsFixed(false);
            }

            // Visibility logic (show/hide navbar on scroll)
            if (
                currentScrollY > lastScrollY &&
                currentScrollY > window.innerHeight * 0.8
            ) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            // Set the background color when scrolling past 80% of the page
            if (currentScrollY > window.innerHeight * 0.8) {
                setIsSolid(true);
            } else {
                setIsSolid(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY, isFixed]);
    return (
        <>
            <nav
                className={`w-full h-[77px]  top-0 z-50 flex items-center justify-between px-6 md:px-14 transition-transform duration-300 ${
                    isVisible ? "translate-y-0" : "-translate-y-full"
                } ${isSolid ? "bg-primary shadow-lg text-black" : ""} ${
                    isFixed ? "fixed" : "absolute"
                }`}
            >
                <div className="flex items-center">
                    <img
                        className="w-[40px] h-[50px] mr-4"
                        src={logo}
                        alt="Logo"
                    />
                    <Link
                        to="/"
                        className="text-white text-[24px] font-semibold font-['Poppins']"
                    >
                        Hippocrate
                    </Link>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link
                        to="/"
                        className={`mt-2 md:mt-0 text-white text-sm  font-['Poppins'] tracking-tight hover:text-[#1f8287] ${
                            location.pathname == "/"
                                ? "font-bold"
                                : "font-normal"
                        }`}
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/services"
                        className={`mt-2 md:mt-0 text-[#e6e6e6] text-sm  font-['Poppins'] tracking-tight hover:text-[#1f8287] ${
                            location.pathname == "/services"
                                ? "font-bold"
                                : "font-normal"
                        }`}
                    >
                        Services
                    </Link>
                    <Link
                        to="/contact"
                        className={`mt-2 md:mt-0 text-[#e6e6e6] text-sm  font-['Poppins'] tracking-tight hover:text-[#1f8287] ${
                            location.pathname == "/contact"
                                ? "font-bold"
                                : "font-normal"
                        }`}
                    >
                        Contact
                    </Link>
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="focus:outline-none"
                    >
                        {/* <img
                        src={isOpen ? close : menu}
                        alt="Menu"
                        className="w-3 h-3"
                    /> */}
                        <IoMdMenu className="text-white text-3xl" />
                    </button>
                </div>
            </nav>
            <div
                className={`fixed top-0 bg-white h-screen z-[999999] flex justify-start text-black flex-col w-3/4 items-center py-20 md:hidden trnasition-all ease-out duration-300 ${
                    isOpen ? "right-0" : "-right-[100vw] "
                }`}
            >
                <button className="focus:outline-none">
                    <IoMdClose
                        className="text-black text-3xl absolute top-4 right-4"
                        onClick={() => setIsOpen(false)}
                    />
                </button>
                <Link
                    to="/"
                    className={`text-center w-full py-4 border-b  border-gray-300 text-sm  font-['Poppins'] tracking-tight hover:text-[#1f8287] ${
                        location.pathname == "/"
                            ? "text-primary font-bold"
                            : "text-black"
                    } `}
                    onClick={() => setIsOpen(false)}
                >
                    Accueil
                </Link>
                <Link
                    to="/services"
                    className={`text-center w-full py-4 border-b  border-gray-300 text-sm  font-['Poppins'] tracking-tight hover:text-[#1f8287] ${
                        location.pathname == "/services"
                            ? "text-primary font-bold"
                            : "text-black"
                    }`}
                    onClick={() => setIsOpen(false)}
                >
                    Services
                </Link>
                <Link
                    to="/contact"
                    className={`text-center w-full py-4 border-b   border-gray-300 text-sm  font-['Poppins'] tracking-tight hover:text-[#1f8287] ${
                        location.pathname == "/contact"
                            ? "text-primary font-bold"
                            : "text-black"
                    }`}
                    onClick={() => setIsOpen(false)}
                >
                    Contact
                </Link>
            </div>
        </>
    );
};

export default Navbar;
