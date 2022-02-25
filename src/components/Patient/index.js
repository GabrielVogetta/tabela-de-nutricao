import React from "react";
import "./styles.css";
import Tooltip from '../../components/Tooltip';

export default function Patient({ name, weight, height, bmi, id }) {  

  return (
    <div className='patient'>

      <Tooltip
        name={name}
        weight={weight}
        height={height}
        id={id}
      />

      <div className='patient_info'>
        <span>Nome</span>  
        <p>{name}</p>
      </div>

      <div className='patient_info'>
        <span>Peso (kg)</span>  
        <p>{weight}</p>
      </div>
       
      <div className='patient_info'>
        <span>Altura (m)</span>  
        <p>{height}</p>
      </div>

      <div className='patient_info'>
        <span>Imc</span>  
        <p>{bmi}</p>
      </div>

      </div>
  );
}
