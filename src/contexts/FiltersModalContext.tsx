import { createContext } from "react";
import { useState } from "react";

type FilterContext = {
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  order: string;
  setOrder: (value: string) => void;
  type: string;
  setType: (value: string) => void;
};

const FiltersModalContext = createContext<FilterContext>({
  showFilters: false,
  setShowFilters: () => {},
  order: "",
  setOrder: () => {},
  type: "",
  setType: () => {},
});

export const FiltersModalProvider: React.FC = ({ children }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [order, setOrder] = useState("");
  const [type, setType] = useState("");

  return (
    <FiltersModalContext.Provider
      value={{
        showFilters,
        setShowFilters,
        order,
        setOrder,
        type,
        setType,
      }}
    >
      {children}
    </FiltersModalContext.Provider>
  );
};

export default FiltersModalContext;
