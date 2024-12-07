import {useState} from 'react'
import CarouselSection from '../components/CarouselSection'
//import TarifCard from '../components/TarifCard'
import TarifGroupe from '../components/TarifGroupe'
import data from "../../data.json";
import SelecteurDuree from '../components/SelecteurDuree';

const NosTarifs = () => {
    const [selectedTarif, setSelectedTarif] = useState("Jour");
  return (
    <div className='py-10 space-y-10 flex flex-col items-center'>
        <CarouselSection />
        <h2 className='text-[40px] text-center font-semibold py-2 '>Nos Tarifs</h2>
        <SelecteurDuree setSelectedTarif={setSelectedTarif} />
        <TarifGroupe obj={data.abonnements[selectedTarif]} />

    </div>
  )
}

export default NosTarifs