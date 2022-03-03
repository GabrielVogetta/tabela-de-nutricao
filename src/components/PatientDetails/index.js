import './styles.css';
import { calculateIdealWeight, colorSetter } from '../../utils';
import Modal from '../Modal';
import closeSVG from '../../assets/close-dark.svg';

export default function PatientDetails({name, weight, height, bmi, onClose}){

    return( 
        <Modal>
            <div className='patient-details_box'>

                <button className='close-button' onClick={onClose}>
                    <img src={closeSVG} alt='Fechar janela'/>
                </button>


                <div>
                    <span>Nome</span>
                    <h3>{name}</h3>
                </div>
                
                <div className='patient-details_patient-info'>

                    <div>
                        <span>Peso</span>
                        <h3>{weight} kg</h3>
                    </div>
                    <div>
                        <span>Altura</span>
                        <h3>{height} m</h3>
                    </div>
                    <div>
                        <span>Imc</span>
                        <h3 style={{color: colorSetter(bmi)}}>{bmi}</h3>
                    </div>

                </div>

                <div className='patient-details_weight-details'>
                    <p>
                        Seu peso ideal é de <span className='green'> {calculateIdealWeight(weight, bmi)[1]} </span> kg
                    </p>

                    <p>
                        No entando continua sáudavel estar entre 
                        <span className='blue'> {calculateIdealWeight(weight, bmi)[0]} </span> 
                        e 
                        <span className='purple'> {calculateIdealWeight(weight, bmi)[2]} </span> kg
                    </p>
                </div>
            </div>
        </Modal>
    );
}