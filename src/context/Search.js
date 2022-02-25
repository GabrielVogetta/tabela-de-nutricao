import { createContext, useState, useContext } from "react";
import { usePatients } from "./Patients";

const SearchContext = createContext();

export default function SearchProvider({children}){

    const {patients} = usePatients();
    
    const [search, setSearch] = useState(patients);

    return(
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch(){
    return useContext(SearchContext);
}