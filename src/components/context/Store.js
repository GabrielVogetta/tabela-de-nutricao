import React, { createContext, useState, useContext } from 'react';

const Store = createContext(false);

export default function StoreProvider({children}){
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return(
        <Store.Provider value={{isModalOpen, setIsModalOpen}}>
            {children}
        </Store.Provider>
    );
}

export function useStore(){
    const {isModalOpen, setIsModalOpen} = useContext(Store);
    return {isModalOpen, setIsModalOpen};
}