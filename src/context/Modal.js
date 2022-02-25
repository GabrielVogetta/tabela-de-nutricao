import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext(false);

export default function ModalProvider({children}){
    
    const [modal, setModal] = useState({
        isOpen: false,
        name: '',
        weight: '',
        height: '',
        func: '',
        id: ''
    });
    
    return(
        <ModalContext.Provider value={{modal, setModal}}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal(){
    const {modal, setModal} = useContext(ModalContext);
    return {modal, setModal};
}