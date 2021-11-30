import React, { useState } from "react";
import "./styles.css";
import { useStore } from "../context/Store";
import { usePeople } from '../context/People';
import api from '../../api';

export default function AddPersonModal() {
  const [newPerson, setNewPerson] = useState({
    name: "",
    weight: null,
    height: null,
    bmi: null,
  });

  const {isModalOpen, setIsModalOpen} = useStore();

  const {people, setPeople} = usePeople();

  const handleChange = ({ target: { name, value } }) => {
    const newState = newPerson;
    newState[name] = value;

    newState.bmi = calculateBmi().toFixed(2);

    setNewPerson(newState);
  };

  const calculateBmi = () => {
    const bmi = newPerson.weight / Math.pow(newPerson.height, 2);
    return bmi;
  }

  return (
    <div className="add-person-modal" style={{display: isModalOpen ? 'block' : 'none'}}>

      <button className='close-modal-button'
        onClick={() => {setIsModalOpen(false)}}
      >
        Close
      </button>

      <form className="add-person-form" onSubmit={e => {
        e.preventDefault();
        setPeople([...people, newPerson]);
        setIsModalOpen(false);
        api.post(newPerson);
        setNewPerson({});
      }}>
        <input
          name="name"
          className="new-person-input"
          placeholder="Nome"
          type='text'
          value={newPerson.name}
          onChange={handleChange}
        />
        <input
          name="weight"
          type='number'
          step="any"
          required
          className="new-person-input"
          placeholder="Peso kg"
          onChange={handleChange}
        />
        <input
          name="height"
          type='number'
          step="any"
          required
          className="new-person-input"
          placeholder="Altura m"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="add-person-button"
        >
          Adiconar
        </button>
      </form>
    </div>
  );
}
