import React, { createContext, useState, useContext } from 'react';

const PeopleContext = createContext([]);

export default function PeopleProvider({children}){
    
    const [people, setPeople] = useState([]);
    
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