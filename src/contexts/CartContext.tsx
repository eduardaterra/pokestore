import React, { createContext, useState } from "react";
import { Pokemon } from "../hooks/useFetchPokemon";

type CartContextType = {
  pokemonCartList: Pokemon[];
  setPokemonCartList: (PokemonList: Pokemon[]) => void;
};

export const CartContext = createContext<CartContextType>({
  pokemonCartList: [],
  setPokemonCartList: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [pokemonCartList, setPokemonCartList] = useState<Pokemon[]>([]);
  return (
    <CartContext.Provider value={{ pokemonCartList, setPokemonCartList }}>
      {children}
    </CartContext.Provider>
  );
};
