import React, { createContext, useState } from "react";
import { Pokemon } from "../hooks/useFetchPokemon";

export type groupedList = { [key: number]: Pokemon[] };

type CartContextType = {
  totalItems: number;
  totalPrice: number;
  groupedCartList: groupedList;
  pokemonCartList: Pokemon[];
  setPokemonCartList: (PokemonList: Pokemon[]) => void;
};

export const CartContext = createContext<CartContextType>({
  totalItems: 0,
  totalPrice: 0,
  groupedCartList: {},
  pokemonCartList: [],
  setPokemonCartList: () => {},
});

export const CartProvider: React.FC = ({ children }) => {
  const [pokemonCartList, setPokemonCartList] = useState<Pokemon[]>([]);

  const totalItems = pokemonCartList.length;

  const totalPrice = pokemonCartList
    .map((pokemon) => pokemon.price)
    .reduce((acc, currentPrice) => acc + currentPrice, 0);

  const groupedCartList = pokemonCartList.reduce<groupedList>(
    (acc: groupedList, current: Pokemon) => {
      const key = current.id;
      acc[key] = acc[key] || [];
      acc[key].push(current);

      return acc;
    },
    {}
  );

  return (
    <CartContext.Provider
      value={{
        totalItems,
        totalPrice,
        groupedCartList,
        pokemonCartList,
        setPokemonCartList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
