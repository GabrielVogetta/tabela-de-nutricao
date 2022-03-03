import React, { createContext, useState, useContext, useEffect } from 'react';
import supabaseApi from '../api';

const PatientsContext = createContext([]);

export default function PatientsProvider({children}){
    
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        getPatients();
    }, []);

    const getPatients = async () => {

        const res = await supabaseApi.getPatients();

        const data = res.data.map(current => {
            return {
                id: current.id,
                name: current.name,
                weight: current.weight.toFixed(2),
                height: current.height.toFixed(2),
                bmi: current.bmi.toFixed(2)
            }
        })

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