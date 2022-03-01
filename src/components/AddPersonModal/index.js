import React, { useState, useEffect } from "react";
import "./styles.css";
import { useModal } from "../../context/Modal";
import { usePatients } from '../../context/Patients';
import {supabase} from '../../services/supabase';
import closeSVG from '../../assets/close-dark.svg';
import PatientDetails from '../PatientDetails';
import { calculateBmi } from "../../utils";

export default function AddPersonModal() {

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const {modal, setModal} = useModal();
  const {patients, setPatients} = usePatients();

  useEffect(() => {
    setName(modal.name);
    setWeight(modal.weight);
    setHeight(modal.height);
  }, [modal])

  const updatePatient = async (id) => {
    const { data, error } = await supabase
    .from('patients')
    .update({
      name,
      weight,
      height,
      bmi: calculateBmi(weight, height)
    })
    .match({ id: id })

    if(error){
      console.log('HOUVE UM ERRO!');
      console.log(error);
    }

    console.log('PACIENTE EDITADO!');
    console.log(data);
  }

  const insertPatient = async () => {
    const { data, error } = await supabase
      .from('patients')
      .insert([
        {name, weight, height, bmi: calculateBmi(weight, height)}
    ])

    if(error){
      console.log('HOUVE UM ERRO!');
      console.log(error);
    }

    console.log('PACIENTE ADICIONADO!');
    console.log(data);
  }

  return (
    <div className="add-person-modal" style={{display: modal.isOpen ? 'block' : 'none'}}>

      { modal.func !== 'Visualizar' &&
        <>
          <button className='close-modal-button'
            onClick={() => {setModal({...modal, isOpen: false})}}
          >
            <img src={closeSVG} alt='Fechar janela'/>
          </button>

          <form className="add-person-form" onSubmit={async e => {
            e.preventDefault();
            const bmi = calculateBmi(weight, height);

            if(modal.func === 'Adicionar'){

              //INSERT
              setPatients([...patients, {name, weight, height, bmi}]);

              insertPatient({name, weight, height, bmi});
            
            }else{

              // UPDATE
              const newState = patients.map((person, index) => {
                if(person.id === modal.id){
                  return {name, weight, height, bmi};
                }else{
                  return person;
                }
              });

              updatePatient(modal.id);
              setPatients(newState);
            }

            setModal({...modal, isOpen: false});

          }}>
            <input
              name="name"
              className="new-person-input"
              placeholder="Nome"
              type='text'
              value={name}
              onChange={e => {setName(e.target.value)}}
            />
            <input
              value={weight}
              name="weight"
              type='number'
              step="any"
              required
              className="new-person-input"
              placeholder="Peso kg"
              onChange={e => {setWeight(e.target.value)}}
            />
            <input
              value={height}
              name="height"
              type='number'
              step="any"
              required
              className="new-person-input"
              placeholder="Altura m"
              onChange={e => {setHeight(e.target.value)}}
            />
            <button
              type="submit"
              className="add-person-button"
            >
              {modal.func}
            </button>
          </form>
        </>
      }

      {
        modal.func === 'Visualizar' &&

        <>
          <button className='close-modal-button'
            onClick={() => {setModal({...modal, isOpen: false})}}
          >
            <img src={closeSVG} alt='Fechar janela'/>
          </button>

          <PatientDetails
            name={name}
            weight={weight}
            height={height}
            bmi={calculateBmi(weight, height)}
          />
        </>
      }
    </div>
  );
}
