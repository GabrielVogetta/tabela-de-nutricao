import './App.css';
import MainHeader from './components/MainHeader';
import Patients from './components/Patients';
import PatientsProvider from './context/Patients';
import SearchProvider from './context/Search';
import SearchInfosProvider from './context/SearchInfos';
import AddPatientButton from './components/AddPatientButton';

function App() {
    
  return (
    <div className='app'>

   

        <PatientsProvider>
          <SearchProvider>
            <SearchInfosProvider>

            <MainHeader/>

            <Patients/>
                    
            </SearchInfosProvider>
          </SearchProvider>
          
          <AddPatientButton/>
        
        </PatientsProvider>

   

    </div>
  );
}

export default App;