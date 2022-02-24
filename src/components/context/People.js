import React, { createContext, useState, useContext, useEffect } from 'react';
import {supabase} from '../../services/supabase';

const PeopleContext = createContext([]);

export default function PeopleProvider({children}){
    
    const [people, setPeople] = useState([]);

    useEffect(() => {
        getPeople();
    }, []);

    const getPeople = async () => {
        const { data } = await supabase.from('patients').select();
        setPeople(data);
    };
    
    return(
        <PeopleContext.Provider value={{people, setPeople}}>
            {children}
        </PeopleContext.Provider>
    );
}

export function usePeople(){
    const {people, setPeople} = useContext(PeopleContext);
    return {people, setPeople};
}