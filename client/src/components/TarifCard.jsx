import PropTypes from "prop-types";

const TarifCard = ({ prices, type }) => {
  return (
    <div
      className={`md:h-96 md:w-64 h-64 w-32  border border-[#A4A4A4] ${
        type == "Individuel" ? "bg-[#1F8287] text-white -translate-y-[1px] lg:-translate-y-0 scale-[101%] lg:scale-100" : "bg-white lg:mt-10"
      } shadow-lg lg:py-10 text-center space-y-1 md:space-y-6`}
    >
      <h2 className="md:text-xl py-4 font-medium">{type}</h2>
      <p className="font-light text-xs md:text-sm">
        Journée Compléte <br /> à partir de 7:45 à minuit
      </p>
      <h2 className="font-semibold md:text-xl">{prices[0]}</h2>
      <p className="font-light text-xs md:text-sm">
        Demi-Journée <br />à partir de 14:00 à minuit
      </p>
      <h2 className="font-semibold text-xl">{prices[1]}</h2>
    </div>
  );
};
TarifCard.propTypes = {
  prices: PropTypes.arrayOf(PropTypes.number).isRequired,
  type: PropTypes.string.isRequired,
};

export default TarifCard;