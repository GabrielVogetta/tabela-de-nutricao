import React, { useState, useEffect } from "react";
import "./styles.css";
import { useModal } from "../context/Modal";
import { usePeople } from '../context/People';
import {supabase} from '../../services/supabase';

export default function AddPersonModal() {

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const {modal, setModal} = useModal();
  const {people, setPeople} = usePeople();

  useEffect(() => {
    setName(modal.name);
    setWeight(modal.weight);
    setHeight(modal.height);
  }, [modal])

  const calculateBmi = () => {
    const bmi = weight / Math.pow(height, 2);
    return bmi;
  }


  const updatePatient = async (id) => {
    const { data, error } = await supabase
    .from('patients')
    .update({
      name,
      weight,
      height,
      bmi: calculateBmi().toFixed(2)
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
        {name, weight, height, bmi: calculateBmi().toFixed(2)}
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

      <button className='close-modal-button'
        onClick={() => {setModal({...modal, isOpen: false})}}
      >
        Close
      </button>

      <form className="add-person-form" onSubmit={async e => {
        e.preventDefault();
        const bmi = calculateBmi().toFixed(2);

        if(modal.func === 'Adicionar'){

          //INSERT
          setPeople([...people, {name, weight, height, bmi}]);

          insertPatient({name, weight, height, bmi});
        
        }else{

          // UPDATE
          const newState = people.map((person, index) => {
            if(person.id === modal.id){
              return {name, weight, height, bmi};
            }else{
              return person;
            }
          });

          updatePatient(modal.id);
          setPeople(newState);
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
    </div>
  );
}
