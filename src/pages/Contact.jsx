
import { Helmet } from "react-helmet";
import Contact1 from "../components/Contact1";
import ContactForm from "../components/ContactForm";
import Map from "../components/Map";

const Contact = () => {
  return (
    <div>
      <Helmet>
        <title>Hippocrate - Contact</title>
        <meta name="description" content="Contactez-nous pour en savoir plus sur nos services et notre espace de coworking à Tunis." />
        <meta name="keywords" content="Hippocrate, contact, coworking, Tunis, services" />
        <link rel="icon" type="image/png" href="/src/assets/hippocrate.png" />
      </Helmet>
      <Contact1 />
      <ContactForm />
      <Map />
    </div>
  );
};

export default Contact;