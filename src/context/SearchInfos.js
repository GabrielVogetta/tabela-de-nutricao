import { createContext, useState, useContext} from "react";

const SearchInfosContext = createContext();

export default function SearchInfosProvider({children}){
    
    const [searchInfos, setSearchInfos] = useState({
        isAlphaOrder: false,
        searchFor: 'Nome'
    });
    
    return(
        <SearchInfosContext.Provider value={{searchInfos, setSearchInfos}}>
            {children}
        </SearchInfosContext.Provider>
    );
}

export function useSearchInfos(){
    return useContext(SearchInfosContext);
}