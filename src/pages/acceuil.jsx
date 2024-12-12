import { Helmet } from "react-helmet";
import CarouselSection from "../components/CarouselSection";
import InfoSection from "../components/InfoSection";
import ServicesSection from "../components/ServicesSection";
import CoworkingPreview from "../components/CoworkingPreview";

const Acceuil = () => {
  return (
    <div>
      <Helmet>
        <title>Hippocrate - Accueil</title>
        <meta
          name="description"
          content="Bienvenue sur le site Hippocrate, votre partenaire idéal pour travailler, créer et innover."
        />
        <meta
          name="keywords"
          content="Hippocrate, coworking, innovation, travail, création"
        />
        <link rel="icon" type="image/png" href="/src/assets/hippocrate.png" />
      </Helmet>
      <CarouselSection />
      <InfoSection />
      <CoworkingPreview />
      <ServicesSection />
    </div>
  );
};

export default Acceuil;
