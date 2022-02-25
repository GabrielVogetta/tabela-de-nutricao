import React from "react";
import "./styles.css";
import Patient from "../Patient";
import { useSearch } from "../context/Search";

export default function Patients() {
  const { search } = useSearch();

  return (
    <ul className="patients">
        {search.map((person) => (
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
