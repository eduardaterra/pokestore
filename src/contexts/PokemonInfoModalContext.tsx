import React, { createContext, useState } from "react";
import { Pokemon } from "../hooks/useFetchPokemon";

type PokemonInfoModal = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  pokemonInfo: Pokemon;
  setPokemonInfo: (value: Pokemon) => void;
};

export const PokemonInfoModalContext = createContext<PokemonInfoModal>({
  showModal: false,
  setShowModal: () => {},
  pokemonInfo: {
    name: "",
    types: [""],
    base_experience: 0,
    key: 0,
    height: 0,
    weight: 0,
    price: 0,
    sprite: "",
  },
  setPokemonInfo: () => {},
});

export const PokemonInfoModalProvider: React.FC = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>({
    name: "",
    types: [""],
    base_experience: 0,
    key: 0,
    height: 0,
    weight: 0,
    price: 0,
    sprite: "",
  });
  return (
    <PokemonInfoModalContext.Provider
      value={{ showModal, setShowModal, pokemonInfo, setPokemonInfo }}
    >
      {children}
    </PokemonInfoModalContext.Provider>
  );
};
