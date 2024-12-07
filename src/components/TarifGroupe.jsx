import TarifCard from "./TarifCard";
import PropTypes from "prop-types";

const splitPrices = (prices) => {
  return prices.split("/");
};

const TarifGroupe = ({ obj }) => {
  let { Individuel, Binome, Trinome } = obj;
  Individuel = splitPrices(Individuel);
  Binome = splitPrices(Binome);
  Trinome = splitPrices(Trinome);
  return (
    <div className="flex gap-20 justify-center">
      <TarifCard prices={Binome} type={"Binôme"} />
      <TarifCard prices={Individuel} type={"Individuel"} />
      <TarifCard prices={Trinome} type={"Trinôme"} />
    </div>
  );
};
TarifGroupe.propTypes = {
  obj: PropTypes.shape({
    Individuel: PropTypes.string.isRequired,
    Binome: PropTypes.string.isRequired,
    Trinome: PropTypes.string.isRequired,
  }).isRequired,
};

export default TarifGroupe;
