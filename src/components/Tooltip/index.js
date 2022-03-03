import { useState, useRef, useEffect } from "react";
import menuSVG from '../../assets/menu.svg';
import './styles.css';
import {usePatients} from '../../context/Patients';
import supabaseApi from '../../api';
import PatientEditor from '../PatientEditor';
import PatientDetails from '../PatientDetails';

export default function Tooltip({name, weight, height, bmi, id}) {
  
  const {patients, setPatients} = usePatients();

  const [isEditorOpen, setIsEditorOpen] = useState(false); 
  const [isDetailsOpen, setIsDetailsOpen] = useState(false); 
  
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

    const res = await supabaseApi.deletePatient(id); 
    
    if(res.error){
      alert('Houve algum erro ;-; tente novamente mais tarde');
    }
  };

  return (
    <>

      {
        isEditorOpen &&
        <PatientEditor
          name={name}
          weight={weight}
          height={height}
          id={id}
          onClose={() => {
            setIsEditorOpen(false);
          }}
        />
      }{
        isDetailsOpen && 
        <PatientDetails
          name={name}
          weight={weight}
          height={height}
          bmi={bmi}
          onClose={() => {
            setIsDetailsOpen(false);
          }}
        />
      }

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
                setIsDetailsOpen(true);
                setIsOpen(false);
              }}>

              Visualizar
            </button>

            <button
              className="tooltip-button"
              onClick={() => {
                setIsEditorOpen(true);
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
    </>
  );
}
