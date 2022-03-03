import {usePatients} from '../../context/Patients';
import supabaseApi from '../../api';
import { calculateBmi } from '../../utils';
import Form from '../Form';
import Modal from '../Modal';
import closeSVG from '../../assets/close-dark.svg';
import './styles.css';

export default function PatientEditor({id, name, weight, height, onClose}){
    
  const {patients, setPatients} = usePatients();

    const updatePatient = async (name, weight, height) => {
      const bmi = calculateBmi(weight, height);

      const res = await supabaseApi.updatePatient(id, name, weight, height, bmi);
  
      if(res.error){
        alert('Houve um erro ;-; tente novamente mais tarde!');
      }

      const newState = patients.map((person, index) => {
        if(person.id === id){
          return {name, weight, height, bmi};
        }else{
          return person;
        }
      });

      setPatients(newState);
    }
    
    return(
      <Modal>

        <div className='patient-editor'>

          <button className='close-button' onClick={onClose}>
            <img src={closeSVG} alt='Fechar janela'/>
          </button>

          <Form
            submitLabel='Editar'
            name={name}
            weight={weight}
            height={height}
            onSubmit={(name, weight, height) => {
              updatePatient(name, weight, height);
            }}
          />

        </div>

      </Modal>
    );
  }