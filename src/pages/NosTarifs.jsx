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
        <h2 className='text-[40px] text-center font-semibold py-2 '>Nos Tarifs</h2>
        <SelecteurDuree setSelectedTarif={setSelectedTarif} />
        <TarifGroupe obj={data.abonnements[selectedTarif]} />
        <p className='max-w-[1000px] px-2 text-[#535659] text-sm md:text-base text-center pt-10'>Nos Tarifs en demi-journée la semaine ou bien le mois font du week-end une exception ou l’accés est considéré comme libre à partir de 7:45.
        Les offres en groupes s’entendent en des binômes ou des trinômes fixes (à révisier une seule fois par année).</p>

    </div>
  )
}

export default NosTarifs