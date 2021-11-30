import { useState } from 'react';
import './App.css';
import MainHeader from './components/MainHeader';
import Table from './components/Table';
import AddPersonModal from './components/AddPersonModal';
import StoreProvider from './components/context/Store';
import PeopleProvider from './components/context/People';

function App() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className='app'>

      <StoreProvider>

        <MainHeader onAdd={() => {setIsModalOpen(!isModalOpen)}}/>

        <PeopleProvider>
          <Table/>        
          <AddPersonModal isOpen={isModalOpen}/>
        </PeopleProvider>

      
      </StoreProvider> 

    </div>
  );
}

export default App;