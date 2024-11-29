import hipp2 from "../assets/hipp2.jpg";

export const Acceuil = () => {
    return (
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
                <p className="w-[958px] h-[81.70px] left-[83px] top-[510px] absolute text-white text-2xl font-normal font-['Poppins'] leading-relaxed tracking-tight">
                    un espace de coworking moderne et dynamique conçu pour les
                    <br />étudiants de toutes disciplines.
                </p>
                
                <div className="absolute left-[102px] top-[610.70px] flex gap-10">
                  
                    <div className="w-[331.41px] h-[64.07px] bg-[#1f8287] flex items-center justify-center cursor-pointer">
                        <button
                            onClick={() => (window.location.href = "#contact")}
                            className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide"
                        >
                            Contact
                        </button>
                    </div>
                   
                    <div className="w-[331.41px] h-[64.07px] bg-[#00adb5]/0 rounded-[3px] border-2 border-white flex items-center justify-center cursor-pointer">
                        <button
                            onClick={() => (window.location.href = "#services")}
                            className="text-white text-base font-semibold font-['Poppins'] uppercase leading-relaxed tracking-wide"
                        >
                            Nos services
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Acceuil;
