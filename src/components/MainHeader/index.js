import React from 'react';
import './styles.css';
import {useModal} from '../context/Modal';

export default function MainHeader(){

    const {setModal} = useModal();

    return(
        <header className='main-header'>
            <h1 className='page-title'>Tabela de Nutrição</h1>
            <button onClick={() => {

                setModal({isOpen: true, func: 'Adicionar', name: '', weight: '', height: '', id: ''});

            }} className='add-button'>Adicionar</button>
        </header>
    );
}