import ImagesSwiper from "./ImagesSwiper";

export const CoworkingPreview = () => {
return (
    <div className="container mx-auto px-4 py-8 ">
        <h1 className="md:text-[52px] font-bold text-[26px] text-center md:font-[600] py-4">
            Aperçu De L&apos;espace
        </h1>
        <ImagesSwiper />

        <div className="my-10"></div>

        <p className="text-center md:text-[20px] text-[18px] max-w-[1250px] mx-auto py-4 pb-8 px-4 md:px-0 md:leading-[38px]  font-poppins ">
            L’Hippocrate offre un cadre unique alliant confort et fonctionnalité,<br className="hidden lg:block" />
            spécialement pensé pour répondre aux besoins des étudiants.
        </p>
    </div>
);
};

export default CoworkingPreview;
