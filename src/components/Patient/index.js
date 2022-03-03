import React from "react";
import "./styles.css";
import Tooltip from '../../components/Tooltip';
import { colorSetter } from "../../utils";

export default function Patient({ name, weight, height, bmi, id }) { 

  return (
    <div className='patient'>

        <Tooltip
          name={name}
          weight={weight}
          height={height}
          bmi={bmi}
          id={id}
        />

        <div className='patient-info'>
          <span>Nome</span>  
          <p>{name}</p>
        </div>

        <div className='patient-info'>
          <span>Peso (kg)</span>
          <p>{weight}</p>
        </div>
        
        <div className='patient-info'>
          <span>Altura (m)</span>  
          <p>{height}</p>
        </div>

        <div className='patient-info'>
          <span>Imc</span>  
          <p style={{
            color: colorSetter(bmi)
          }}>
            {bmi}
          </p>
        </div>

      </div>
  );
}
