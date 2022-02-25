import {useState, useEffect} from 'react';
import './styles.css';
import {usePatients} from '../../context/Patients';
import {useSearch} from '../../context/Search';

export default function MainHeader(){

    const {patients} = usePatients();
    const {setSearch} = useSearch();

    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState('');


    const lowerQuery = query.toLowerCase();

    useEffect(() => {
        const newSearch = patients.filter(person => 
            person.name.toLowerCase().includes(lowerQuery)
        );
        
        setSearch(newSearch);
            
        if(query === ''){
            setSearch(patients);
        }
        
    }, [query, lowerQuery, setSearch, patients]);

    return(
        <header className='main-header'>
            <h1 className='page-title'>Tabela de Nutrição</h1>

            {
                !isSearching &&
                
                <button 
                    className='search-button' 
                    onClick={() => {
                        setIsSearching(true);
                    }}>
                    Busca
                </button>
            }
            {
                isSearching && 
                
                <input
                    onBlur={() => {
                        setIsSearching(false);
                    }}
                    autoFocus
                    className='search-input'
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                    }}
                    onKeyDown={e => {
                        if(e.key === 'Enter'){
                            setIsSearching(false);
                        }
                    }}
                />
            }
        
        </header>
    );
}