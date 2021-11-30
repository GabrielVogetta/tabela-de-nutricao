import React from 'react';
import './styles.css';
import {useStore} from '../context/Store';

export default function MainHeader(){

    const {setIsModalOpen} = useStore();

    return(
        <header className='main-header'>
            <h1 className='page-title'>Tabela de Nutrição</h1>
            <button onClick={() => {

                setIsModalOpen(true);

            }} className='add-button'>Adicionar</button>
        </header>
    );
}