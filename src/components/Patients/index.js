import React from "react";
import "./styles.css";
import Patient from "../Patient";
import { usePeople } from "../context/People";

export default function Patients() {
  const { people } = usePeople();

  return (
    <ul className="patients">
        {people.map((person, index) => (
          <li key={person.id}>
            <Patient
              id={person.id}
              name={person.name}
              weight={person.weight}
              height={person.height}
              bmi={person.bmi}
            />
          </li>
        ))}
    </ul>
  );
}
