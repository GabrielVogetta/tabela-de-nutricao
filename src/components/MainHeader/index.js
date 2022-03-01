import { useState, useEffect, useCallback, useRef } from "react";
import "./styles.css";
import { usePatients } from "../../context/Patients";
import { useSearch } from "../../context/Search";
import { useSearchInfos } from "../../context/SearchInfos";
import searchSVG from "../../assets/search.svg";
import infoSVG from "../../assets/info.svg";
import closeSVG from "../../assets/close-light.svg";

export default function MainHeader() {

  const { patients } = usePatients();
  const { setSearch } = useSearch();
  const {searchInfos, setSearchInfos} = useSearchInfos();

  const [query, setQuery] = useState("");
  const [searchFor, setSearchFor] = useState("Nome");
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const infoRef = useRef();

  const isDesktop = window.innerWidth > 1020;

  // On Click Outside Info
  useEffect(() => {
    document.addEventListener('click', e => {
      if(!infoRef.current.contains(e.target)){
        setIsInfoOpen(false);
      }
    })
  }, [])

  const searchPatient = useCallback((query) => {
    const lowerQuery = query.toLowerCase();

    if (query === "") {
      setSearch(patients);
      return;
    }

    let newSearch;

    if (searchFor === "Nome") {
      newSearch = patients.filter((person) =>
        person.name.toLowerCase().includes(lowerQuery)
      );
    }
    if (searchFor === "Peso") {
      newSearch = patients.filter((person) =>
        person.weight.toString().toLowerCase().includes(lowerQuery)
      );
    }
    if (searchFor === "Altura") {
      newSearch = patients.filter((person) =>
        person.height.toString().toLowerCase().includes(lowerQuery)
      );
    }
    if (searchFor === "Imc") {
      newSearch = patients.filter((person) =>
        person.bmi.toString().toLowerCase().includes(lowerQuery)
      );
    }

    setSearch(newSearch);
  }, [patients, searchFor, setSearch]);

  useEffect(() => {
    searchPatient(query);
  }, [searchPatient, query]);

  const mobileReturn = (value1, value2) => {
    return isSearching && !isDesktop ? value1 : value2; 
  }

  return (
  <header className="main-header" style={{justifyContent: mobileReturn('center', 'space-between')}}>
      
          <div 
            ref={infoRef}
            style={{display: mobileReturn('none', 'block')}}
          >
            <button
              className="info-button"
              onClick={() => {
                setIsInfoOpen(!isInfoOpen);
              }}
            >
              <img src={infoSVG} alt="Informação" />
            </button>

            <div className={`info ${isInfoOpen && "info-open"}`}>
              <h2>Índices de IMC</h2>
              <p>
                Abaixo de 18.5 - <span className="yellow">Abaixo do peso</span>
              </p>
              <p>
                Entre 18.5 e 25 - <span className="green">Peso ideal</span>
              </p>
              <p>
                Entre 26 e 30 - <span className="orange">Acima do peso</span>
              </p>
              <p>
                Acima de 30 - <span className="red">Obesidade</span>
              </p>
            </div>
          </div>

          <h1 
            className="page-title"
            style={{display: mobileReturn('none', 'block')}}
          >
          Tabela de Nutrição
          </h1>

          <button
            className='alpha-order-button'
            style={{display: mobileReturn('none', 'block'), border: searchInfos.isAlphaOrder && '0'}}
            onClick={() => {
              setSearchInfos({...searchInfos, isAlphaOrder: !searchInfos.isAlphaOrder});
            }}
          >
            A - Z
          </button>

        <div className='filter'>
              <div className='select' style={{display: !isSearching && !isDesktop && 'none'}}>
                <label className='select-label'>Pesquisar por</label>
                <select
                  onChange={(e) => {
                    setQuery("");
                    setSearchFor(e.target.value);
                  }}
                  >
                  <option>Nome</option>
                  <option>Peso</option>
                  <option>Altura</option>
                  <option>Imc</option>
                </select>
              </div>

              <input
                className="search-input"
                style={{display: !isSearching && !isDesktop && 'none'}}
                placeholder={"Pesquise o paciente"}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  searchPatient(e.target.value);
                }}
              />

          <button className='search-button' onClick={() => {setIsSearching(!isSearching)}}>
            <img src={mobileReturn(closeSVG, searchSVG)} alt='Pesquisar'/>
          </button>
        </div>

    </header>
  );
}
