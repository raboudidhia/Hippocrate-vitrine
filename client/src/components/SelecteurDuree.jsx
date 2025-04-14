import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

function SelecteurDuree({setSelectedTarif}) {
    const [selected, setSelected] = useState("Jour");
    useEffect(()=>{
        setSelectedTarif(selected);

    },[selected])
    const options = ["Jour", "Semaine", "Mois"];

    return (
        <div className="flex s">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => setSelected(option)}
                    className={`px-4 transition-all ease-linear duration-300 border-t border-b  py-2 ${
                        option == "Jour" ? "border-l rounded-l-md" : ""
                    } ${option == "Mois" ? "rounded-r-md border-r" : ""}
                    ${option == selected? "bg-primary text-white":""}`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

SelecteurDuree.propTypes = {
    setSelectedTarif: PropTypes.func.isRequired,
};

export default SelecteurDuree;