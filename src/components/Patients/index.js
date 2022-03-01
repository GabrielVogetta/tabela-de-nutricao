import "./styles.css";
import Patient from "../Patient";
import { useSearch } from "../../context/Search";
import { usePatients } from "../../context/Patients";
import { useSearchInfos } from "../../context/SearchInfos";

export default function Patients() {

  const { search } = useSearch();
  const { patients } = usePatients();
  const {searchInfos} = useSearchInfos();

  if(searchInfos.isAlphaOrder){
    patients.sort((a, b) => {
      if(a.name > b.name){
        return 1;
      }else if(a.name < b.name){
        return -1;
      }
      return 0;
    });
  }else{
    patients.sort((a, b) => {
      return a.id - b.id;
    });
  }
  
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
