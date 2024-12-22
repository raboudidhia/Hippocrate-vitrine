import buvette from "../assets/pricebuvette.png";

export const Buvette = () => {
  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-semibold text-center mb-8">Notre Buvette</h1>
      <p className="  text-center text-gray-700 ">
        Découvrez ce que notre buvette vous propose <br />
        une pause conviviale avec des boissons et snacks pour recharger vos
        batteries.
      </p>
      <img
        className="
    mx-auto 
    my-auto 
    w-[511px] 
    h-[819px] 
    mt-10 
    shrink-0
    xs:w-[250px] xs:h-[350px] 
    sm:w-[300px] sm:h-[500px] 
    md:w-[400px] md:h-[650px]
  "
        src={buvette}
        alt=""
      />
    </div>
  );
};

export default Buvette;
