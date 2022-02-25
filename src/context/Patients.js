import React, { createContext, useState, useContext, useEffect } from 'react';
import {supabase} from '../../services/supabase';

const PatientsContext = createContext([]);

export default function PatientsProvider({children}){
    
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {
        const { data } = await supabase.from('patients').select();
        setPatients(data);
    };
    
    return(
        <PatientsContext.Provider value={{patients, setPatients}}>
            {children}
        </PatientsContext.Provider>
    );
}

export function usePatients(){
    return useContext(PatientsContext);
}