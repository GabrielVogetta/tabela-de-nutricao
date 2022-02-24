import React, { useRef, useState, useEffect } from "react";
import "./styles.css";
import { usePeople } from "../context/People";
import { useModal } from "../context/Modal";
import { supabase } from "../../services/supabase";
import menuSVG from '../../assets/menu.svg';

export default function Patient({ name, weight, height, bmi, id }) {
  const [isOptsOpen, setIsOptsOpen] = useState(false);

  const { people, setPeople } = usePeople();

  var isFirstRender = useRef(true);

  const { setModal } = useModal();

  const tooltipRef = useRef();

  useEffect(() => {
    if(isFirstRender.current === false){

      document.addEventListener('click', e => {
        if(!tooltipRef.current.contains(e.target)){
          setIsOptsOpen(false);
        }
      })

    }else{
      isFirstRender.current = false;
    }

  }, [setIsOptsOpen]);

  const onDelete = async () => {
    const newPeople = people.filter(person => person.id !== id);
    setPeople(newPeople);

    const { data, error } = await supabase
    .from('patients')
    .delete()
    .match({ id: id });

    if(error){
      console.log('Oooops, houve um erro ;-;');
      console.log(error);
    }
    
    console.log('Deletado do Supabase!');
    console.log(data);
  };

  return (
    <div className='patient'>

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

      <div className='opts'>

        <button
          className="opts-button"
          onClick={() => {
            setIsOptsOpen(!isOptsOpen);
          }}
        >
          <img src={menuSVG} alt="Ícone de menu"/>
        </button>
        
        <div
          ref={tooltipRef}
          className="tooltip"
          style={{ display: isOptsOpen ? "block" : "none" }}
        >
          <button
            className="delete-button"
            onClick={() => {
              setModal({ isOpen: true, func: "Editar", name: name, weight: weight, height: height, id: id});
              setIsOptsOpen(false);
            }}
          >
            Editar
          </button>
          <button className="delete-button" onClick={onDelete}>
            Deletar
          </button>
        </div> 

      </div>
    </div>
  );
}
