import { createContext } from "react";
import { useState } from "react";

type FilterContext = {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
};

const FiltersModalContext = createContext<FilterContext>({
  showFilters: false,
  setShowFilters: () => {},
});

export const FiltersModalProvider: React.FC = ({ children }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <FiltersModalContext.Provider value={{ showFilters, setShowFilters }}>
      {children}
    </FiltersModalContext.Provider>
  );
};

export default FiltersModalContext;
