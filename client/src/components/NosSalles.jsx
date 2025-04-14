import camera1 from "../assets/camera1.jpg";
import camera2 from "../assets/camera2.jpg";
import athéna from "../assets/Rectangle 123.png";



export const NosSalles = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-semibold text-center mb-12">
        Nos Salles Disponibles
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={camera1}
            alt="Salle Aphrodite"
            className="w-full h-48 object-cover"
          />
          <div className="p-10">
            <h2 className="text-xl font-bold text-center">Salle Aphrodite</h2>
            <p className="text-gray-600 text-center">Capacité de 35 Places</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={athéna}
            alt="Salle Athéna"
            className="w-full h-48 object-cover"
          />
          <div className="p-10">
            <h2 className="text-xl font-bold text-center">Salle Athéna</h2>
            <p className="text-gray-600 text-center">Capacité de 30 Places</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={camera2}
            alt="Salle Appolon"
            className="w-full h-48 object-cover"
          />
          <div className="p-10">
            <h2 className="text-xl font-bold text-center">Salle Appolon</h2>
            <p className="text-gray-600 text-center">Capacité de 30 Places</p>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-700 mt-8">
        Nous mettons à votre disposition trois salles dédiées aux formations.
        Les tarifs varient entre{" "}
        <span className="font-bold">90 et 130 TND hors taxes</span>, en fonction
        de la <span className="font-bold">salle choisie</span> et de la{" "}
        <span className="font-bold">durée d'occupation</span>.
      </p>
    </div>
  );
};
export default NosSalles;