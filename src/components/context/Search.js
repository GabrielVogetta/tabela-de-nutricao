import { createContext, useState, useContext } from "react";
import { usePeople } from "./People";

const SearchContext = createContext();

export default function SearchProvider({children}){

    const {people} = usePeople();
    
    const [search, setSearch] = useState(people);

    return(
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch(){
    return useContext(SearchContext);
}