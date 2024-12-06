import React from 'react'
import TarifCard from './TarifCard';


const splitPrices = (prices)=>{
    return prices.split("/");
}

const TarifGroupe = ({obj}) => {
    let {Individuel,Binome,Trinome} = obj;
    Individuel = splitPrices(Individuel);
    Binome = splitPrices(Binome);
    Trinome = splitPrices(Trinome);
  return (
    <div className='flex gap-20 justify-center'>
        <TarifCard prices={Binome} type={"Binôme"} />
        <TarifCard prices={Individuel} type={"Individuel"} />
        <TarifCard prices={Trinome} type={"Trinôme"} />
    </div>
  )
}

export default TarifGroupe