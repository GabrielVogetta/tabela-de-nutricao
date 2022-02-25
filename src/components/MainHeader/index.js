import {useState, useEffect} from 'react';
import './styles.css';
import {usePeople} from '../context/People';
import {useSearch} from '../context/Search';

export default function MainHeader(){

    const {people} = usePeople();
    const {setSearch} = useSearch();

    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState('');

    const lowerQuery = query.toLowerCase();

    useEffect(() => {
        const newSearch = people.filter(person => 
            person.name.toLowerCase().includes(lowerQuery)
        );
        
        setSearch(newSearch);
            
        if(query === ''){
            setSearch(people);
        }
        
    }, [query, lowerQuery, setSearch, people]);

    return(
        <header className='main-header'>
            <h1 className='page-title'>Tabela de Nutrição</h1>

            {
                !isSearching &&
                
                <button className='search-button' onClick={() => {setIsSearching(true)}}>
                    Busca
                </button>
            }
            {
                isSearching && 
                
                <input
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