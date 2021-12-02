import React from "react";
import "./styles.css";
import Person from "../Person";
import { usePeople } from "../context/People";

export default function Table() {
  const { people } = usePeople();

  return (
    <table className="table">
      <thead className="t-head">
        <tr>
          <th>Nome</th>
          <th>Peso kg</th>
          <th>Altura m</th>
          <th>IMC</th>
        </tr>
      </thead>
      <tbody className="t-body">
        {people.map((person, index) => (
          <Person
            key={index}
            id={index}
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
