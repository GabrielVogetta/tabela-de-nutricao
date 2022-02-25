import { useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Patients from './components/Patients';
import AddPersonModal from './components/AddPersonModal';
import ModalProvider, {useModal} from './components/context/Modal';
import PeopleProvider from './components/context/People';
import SearchProvider from './components/context/Search';
import plusSVG from './assets/plus.svg';

function AddPatientButton(){

  const {setModal} = useModal();

  return(
    <button onClick={() => {

      setModal({isOpen: true, func: 'Adicionar', name: '', weight: '', height: '', id: ''});

    }} className='add-button'>
      
      <img src={plusSVG} alt='Adicionar paciente' width={'50%'}/>
    
    </button>
  );
}

function App() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className='app'>

      <ModalProvider>

        <PeopleProvider>
          <SearchProvider>

            <MainHeader onAdd={() => {setIsModalOpen(!isModalOpen)}}/>

            <Patients/> 
            <AddPersonModal isOpen={isModalOpen}/>
        
          </SearchProvider>
        </PeopleProvider>

        <AddPatientButton/>
      
      </ModalProvider> 

    </div>
  );
}

export default App;