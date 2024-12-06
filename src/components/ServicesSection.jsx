import React from "react";
import data from "../../data.json";
import { ServiceCard } from "./ServiceCard";

const ServicesSection = () => {
    return (
        <div className="py-10">
            <h2 className="text-[64px] text-center font-[600] py-4">Composition de l’espace</h2>
            <p className="text-center text-[24px] max-w-[1250px] mx-auto py-4 pb-8 leading-[38px]">
                Entre salle polyvalentes , grande salle de lecture, terrasse en
                plain air et salle annexe,chaque coin de <br /> L’Hippocrate est pensé
                pour inspirer votre créativité. Avec une connexion Wi-Fi
                ultra-rapide et un Coffee <br /> Shop accueillant, combinez
                Productivité et plaisir dans un cadre unique.
            </p>
            <div className="flex justify-center gap-36">
                <div className="flex flex-col gap-10">
                    {[data.composition[0], data.composition[2]].map(
                        (obj, index) => (
                            <ServiceCard obj={obj} key={index} />
                        )
                    )}
                </div>
                <div className="flex flex-col gap-10 md:pt-10 ">
                    {[data.composition[2], data.composition[3]].map(
                        (obj, index) => (
                            <ServiceCard obj={obj} key={index} />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServicesSection;
