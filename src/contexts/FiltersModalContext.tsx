import { createContext } from "react";
import { useState } from "react";

type FilterContext = {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  path: string;
  setPath: (value: string) => void;
};

const FiltersModalContext = createContext<FilterContext>({
  showFilters: false,
  setShowFilters: () => {},
  path: "",
  setPath: () => {},
});

export const FiltersModalProvider: React.FC = ({ children }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [path, setPath] = useState("");

  return (
    <FiltersModalContext.Provider
      value={{ showFilters, setShowFilters, path, setPath }}
    >
      {children}
    </FiltersModalContext.Provider>
  );
};

export default FiltersModalContext;
