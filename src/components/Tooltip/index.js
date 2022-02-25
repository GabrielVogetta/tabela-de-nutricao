import { useState } from "react";
import menuSVG from '../../assets/menu.svg';
import './styles.css';
import {useModal} from '../../components/context/Modal';
import {usePeople} from '../../components/context/People';
import { supabase } from "../../services/supabase";

export default function Tooltip({name, weight, height, id}) {
  const [isOpen, setIsOpen] = useState(false);

  const {setModal} = useModal();
  const {people, setPeople} = usePeople();

  const onDelete = async () => {
    const newPeople = people.filter(person => person.id !== id);
    setPeople(newPeople);

    const { data, error } = await supabase
    .from('patients')
    .delete()
    .match({ id: id });

    if(error){
      console.log('Oooops, houve um erro ;-;');
      console.log(error);
      return;
    }
    
    console.log('Deletado do Supabase!');
    console.log(data);
  };

  return (
    <div className='opts'>

      <button
        className="opts-button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img className="menu-icon" src={menuSVG} alt="Ícone de menu" />
      </button>

      <div
          className="tooltip"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <button
            className="tooltip-button"
            onClick={() => {
              setModal({ isOpen: true, func: "Editar", name: name, weight: weight, height: height, id: id});
              setIsOpen(false);
            }}
          >
            Editar
          </button>
          <button className="tooltip-button" onClick={onDelete}>
            Deletar
          </button>
        </div> 
    </div>
  );
}
