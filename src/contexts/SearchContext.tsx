import { createContext, useState } from "react";

type SearchType = {
  searchPokemon: string;
  setSearchPokemon: (value: string) => void;
};

const SearchContext = createContext<SearchType>({
  searchPokemon: "",
  setSearchPokemon: () => {},
});

export const SearchProvider: React.FC = ({ children }) => {
  const [searchPokemon, setSearchPokemon] = useState("");

  return (
    <SearchContext.Provider value={{ searchPokemon, setSearchPokemon }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
