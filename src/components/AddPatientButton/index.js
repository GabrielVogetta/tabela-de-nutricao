import {useState} from 'react';
import PatientAdder from "../PatientAdder";
import plusSVG from '../../assets/plus.svg';
import './styles.css';

export default function AddPatientButton(){

    const [isOpen, setIsOpen] = useState(false);
  
    return(
      <>
        <button
          onClick={() => {
            setIsOpen(true);
          }} 
          className='add-button'
        >  
          <img src={plusSVG} alt='Adicionar paciente' width={'50%'}/>
        </button>
  
        {
         isOpen &&
          <PatientAdder 
            onClose={() => {setIsOpen(false)}}
          />
        }
      </>
    );
  }