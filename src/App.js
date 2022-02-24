import { useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Patients from './components/Patients';
import AddPersonModal from './components/AddPersonModal';
import ModalProvider from './components/context/Modal';
import PeopleProvider from './components/context/People';

function App() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className='app'>

      <ModalProvider>

        <MainHeader onAdd={() => {setIsModalOpen(!isModalOpen)}}/>

        <PeopleProvider>
          <Patients/> 
          <AddPersonModal isOpen={isModalOpen}/>
        </PeopleProvider>
      
      </ModalProvider> 

    </div>
  );
}

export default App;