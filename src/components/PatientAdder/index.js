import "./styles.css";
import closeSVG from '../../assets/close-dark.svg';
import { calculateBmi } from "../../utils";
import supabaseApi from "../../api";
import {usePatients} from '../../context/Patients';
import Modal from "../Modal";
import Form from "../Form";

export default function PatientAdder({onClose}) {

    const {patients, setPatients} = usePatients();

    const insertPatient = async (name, weight, height) => {

        console.log(patients);

        const bmi = calculateBmi(weight, height);
        
        const res = await supabaseApi.insertPatient(name, weight, height, bmi);
        
        setPatients([...patients, {name, weight, height, bmi}]);
        
        if(res.error){
            alert('Houve um erro ;-; tente novamente mais tarde!');
            return;
        }

        onClose();
    }

  return (
    <Modal>
        <div className="patient-adder">
                
                <button className='close-button' onClick={onClose}>
                    <img src={closeSVG} alt='Fechar janela'/>
                </button>

                <Form
                    submitLabel='Adicionar'
                    onSubmit={(name, weight, height) => {
                        insertPatient(name, weight, height);
                    }}
                />

        </div>
    </Modal>
  );
}
