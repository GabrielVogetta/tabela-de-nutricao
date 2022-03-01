import { useState, useRef, useEffect } from "react";
import menuSVG from '../../assets/menu.svg';
import './styles.css';
import {useModal} from '../../context/Modal';
import {usePatients} from '../../context/Patients';
import { supabase } from "../../services/supabase";

export default function Tooltip({name, weight, height, id}) {
  
  const {setModal} = useModal();
  const {patients, setPatients} = usePatients();
  
  const [isOpen, setIsOpen] = useState(false);

  const tooltipRef = useRef();

  // On CLick Outside Tooltip
  useEffect(() => {
    let handler = e => {

      if(tooltipRef.current){
        if(!tooltipRef.current.contains(e.target)){
          setIsOpen(false);
        }
      }

    }

    document.addEventListener('mousedown', handler);

    return () => {
      document.addEventListener('mousedown', handler);
    }
  }, []);

  const onDelete = async () => {
    const newPatients = patients.filter(person => person.id !== id);
    setPatients(newPatients);

    const { error } = await supabase
    .from('patients')
    .delete()
    .match({ id: id });

    if(error){
      alert('Houve algum erro ;-; tente novamente mais tarde');
    }
  };

  return (
      <div className='opts' ref={tooltipRef}>

        <button
          className="opts-button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <img className="menu-icon" src={menuSVG} alt="Ícone de menu" />
        </button>

        <div
            className="tooltip"
            style={{ display: isOpen ? "block" : "none" }}
          >

            <button 
              className="tooltip-button" 
              onClick={() => {
                setModal({ isOpen: true, func: "Visualizar", name: name, weight: weight, height: height, id: id});
                setIsOpen(false);
              }}>

              Visualizar
            </button>

            <button
              className="tooltip-button"
              onClick={() => {
                setModal({ isOpen: true, func: "Editar", name: name, weight: weight, height: height, id: id});
                setIsOpen(false);
              }}
            >
              Editar
            </button>

            <button className="tooltip-button" onClick={onDelete}>
              Deletar
            </button>
          </div> 
      </div>
  );
}
