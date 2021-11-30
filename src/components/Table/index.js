import React, {useEffect} from "react";
import "./styles.css";
import Person from "../Person";
import { usePeople } from "../context/People";
import api from '../../api/index';

export default function Table() {
  const { people, setPeople } = usePeople();

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const data = await api.get();
    setPeople(data);
  }

  return (
    <table className="table">
      <thead className="t-head">
        <tr>
          <th>Nome</th>
          <th>Peso</th>
          <th>Altura</th>
          <th>IMC</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {people.map((person, index) => (
          <Person
            key={index}
            name={person.name}
            weight={person.weight}
            height={person.height}
            bmi={person.bmi}
          />
        ))}
      </tbody>
    </table>
  );
}
