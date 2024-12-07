import data from "../../data.json";
import { ServiceCard } from "./ServiceCard";

const ServicesSection = () => {
  return (
    <div className="py-4 flex-col items-center">
      <h2 className="md:text-[52px] font-bold text-[26px] text-center md:font-[600] py-4">
        Composition de l’espace
      </h2>
      <p className="text-center md:text-[20px] text-[18px] max-w-[1250px] mx-auto py-4 pb-8 px-4 md:px-0 md:leading-[38px]">
        Entre salle polyvalentes , grande salle de lecture, terrasse en plain
        air et salle annexe,chaque coin de <br className="hidden md:block" />{" "}
        L’Hippocrate est pensé pour inspirer votre créativité. Avec une
        connexion Wi-Fi ultra-rapide et un Coffee <br /> Shop accueillant,
        combinez Productivité et plaisir dans un cadre unique.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-36">
        <div className="flex flex-col gap-10">
          {[data.composition[0], data.composition[2]].map((obj, index) => (
            <ServiceCard obj={obj} key={index} />
          ))}
        </div>
        <div className="flex flex-col gap-10 md:pt-10 ">
          {[data.composition[1], data.composition[3]].map((obj, index) => (
            <ServiceCard obj={obj} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
