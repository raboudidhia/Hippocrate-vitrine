import React from 'react'


const TarifCard = ({prices,type}) => {


  return (
    <div className={`h-96 w-64  border border-[#A4A4A4] ${type == 'Individuel'? "bg-[#1F8287] text-white":"bg-white mt-10"} shadow-md py-10 text-center space-y-6`}>
        <h2 className='text-xl py-4 font-medium'>{type}</h2>
        <p className='font-light text-sm'>Journée Compléte <br /> à partir de 7:45 à minuit</p>
        <h2 className='font-semibold text-xl'>{prices[0]}</h2>
        <p className='font-light text-sm'>Demi-Journée <br />à partir de 14:00 à minuit</p>
        <h2 className='font-semibold text-xl'>{prices[1]}</h2>
    </div>
  )
}

export default TarifCard