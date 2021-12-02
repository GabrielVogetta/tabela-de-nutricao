import React, { useState } from "react";
import "./styles.css";
import { usePeople } from "../context/People";
import arrowSVG from "../../assets/arrow.svg";
import { useModal } from "../context/Modal";

export default function Person({ name, weight, height, bmi, id }) {
  const [isOptsOpen, setIsOptsOpen] = useState(false);

  const { people, setPeople } = usePeople();

  const { setModal } = useModal();

  const onDelete = () => {
    const newPeople = people.filter((e, index) => index !== id);
    setPeople(newPeople);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{weight}</td>
      <td>{height}</td>
      <td className="bmi-td">
        {bmi}
        <button
          className="opts-button"
          onClick={() => {
            setIsOptsOpen(!isOptsOpen);
          }}
        >
          <img src={arrowSVG} alt="" className={isOptsOpen ? "opts-open" : undefined} />
        </button>
        <div
          className="opts"
          style={{ display: isOptsOpen ? "block" : "none" }}
        >
          <button
            className="delete-button"
            onClick={() => {
              setModal({ isOpen: true, func: "Editar", name: name, weight: weight, height: height, id: id});
              setIsOptsOpen(false);
            }}
          >
            Editar
          </button>
          <button className="delete-button" onClick={onDelete}>
            Deletar
          </button>
        </div>
      </td>
    </tr>
  );
}
