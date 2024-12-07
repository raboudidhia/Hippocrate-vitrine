//import React from "react";
import { IoDocumentsSharp } from "react-icons/io5";

import big from "../assets/hipp10.jpg";
import sm_left from "../assets/hipp4.jpg";
import sm_right from "../assets/hipp5.jpg";
import ic_clock_icon from "../assets/ic-clock.png";
//import doc_icon from "../assets/union-1.png";
import snack_icon from "../assets/snack.png";

const InfoSection = () => {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row md:gap-36 md:justify-center md:max-w-[1100px] md:mx-auto items-center px-2 gap-6 py-20">
      <div
        className="md:h-[500px] h-[350px] w-[min(70%,400px)] rounded-lg relative shrink-0 "
        style={{ backgroundImage: `url(${big})`, backgroundSize: "100% 100%" }}
      >
        <div className="p-2 bg-white absolute top-[10%] h-[36%] w-[36%] -translate-x-[50%] rounded-lg">
          <div
            className="w-full h-full rounded-lg  bg-cover "
            style={{
              backgroundImage: `url(${sm_left})`,
              backgroundSize: "100% 100%",
            }}
          ></div>
        </div>
        <div className="p-2 bg-white absolute bottom-[10%] h-[36%] w-[36%] right-0 translate-x-[50%] rounded-lg">
          <div
            className="w-full h-full rounded-lg  bg-center "
            style={{
              backgroundImage: `url(${sm_right})`,
              backgroundSize: "150% 100%",
            }}
          ></div>
        </div>
      </div>
      <div className="space-y-4 max-w-screen">
        <h2 className="font-semibold leading-tight text-[36px] max-w-[32rem]">
          Les meilleurs espaces de travail créatifs adaptés à vos besoins.
        </h2>
        <p className="font-light">
          Des sièges ergonomiques et des bureaux spacieux garantissent votre
          bien-être tout au long de la journée, tandis qu&apos;une ambiance
          chaleureuse et lumineuse favorise la concentration et la créativité.
        </p>
        <ul className="space-y-4">
          <li>
            <div className="flex flex-row gap-6">
              <div className="bg-primary h-14 w-14 rounded-2xl p-[0.8rem] shrink-0">
                <img
                  src={ic_clock_icon}
                  className="w-full h-full translate-x-[0.125rem]"
                />
              </div>
              <div>
                <h2 className="font-bold ">Ouvert de 7h45 à minuit</h2>
                <p className="font-light">
                  Travaillez à votre rythme chez Hippocrate, un espace de
                  coworking confortable et productif, toute la journée
                  jusqu&apos;à minuit.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex flex-row gap-6">
              <div className="bg-primary h-14 w-14 rounded-2xl p-[0.8rem] shrink-0 ">
                <img src={snack_icon} className="w-full h-full " />
              </div>
              <div>
                <h2 className="font-bold ">Snack & boisson</h2>
                <p className="font-light">
                  Prenez une pause sans perdre de temps grâce à notre buvette
                  pratique et accessible.
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex flex-row gap-6">
              <div className="bg-primary h-14 w-14 rounded-2xl p-[0.8rem] shrink-0">
                <IoDocumentsSharp className="w-full h-full text-white" />
              </div>
              <div>
                <h2 className="font-bold ">Documents</h2>
                <p className="font-light">
                  Accédez à tous les documents essentiels pour vos études en
                  médecine centralisés et facilement consultables.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoSection;
