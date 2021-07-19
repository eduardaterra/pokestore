import { useContext } from "react";
import styled from "styled-components";

import { Pokemon } from "../hooks/useFetchPokemon";
import { CartContext } from "../contexts/CartContext";
import { PokemonInfoModalContext } from "../contexts/PokemonInfoModalContext";

import PokemonColor, { A } from "../helpers/PokemonColor";
import PokemonType from "./PokemonType";
import PokemonImage from "./PokemonImage";
import AddToCartButton from "./AddToCartButton";

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const { pokemonCartList, setPokemonCartList } = useContext(CartContext);
  const { setShowModal, setPokemonInfo } = useContext(PokemonInfoModalContext);

  return (
    <PokemonCardComponent>
      <PokemonImage
        primaryColor={PokemonColor(pokemon.types[0] as A)}
        secondaryColor={PokemonColor(pokemon.types[1] as A)}
        pokeImg={pokemon.sprite}
        pokemonImageSize={{ height: 8, width: 8 }}
        onClick={() => {
          setShowModal(true);
          setPokemonInfo(pokemon);
        }}
      />

      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonTypeContainer>
        {pokemon.types.map((type) => (
          <PokemonType
            pokemonColor={PokemonColor(type as A)}
            pokemonType={type}
            fontSize={0.45}
            backgroundSize={{ height: 1.33, width: 4.4 }}
          />
        ))}
      </PokemonTypeContainer>
      <PokemonPrice> ¥ {pokemon.price}</PokemonPrice>
      <AddToCartButton
        fontSize={0.6}
        iconSize={1.3}
        backgroundSize={{
          height: 2,
          width: 10,
        }}
        onClick={() => {
          setPokemonCartList([...pokemonCartList, pokemon]);
        }}
      />
    </PokemonCardComponent>
  );
};

const PokemonCardComponent = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--light-gray);
  border-radius: 1rem;
  width: 15rem;
  height: 18rem;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);

  align-items: center;
`;

const PokemonName = styled.h2`
  justify-content: center;
  align-content: center;
  text-align: justify;
  margin: 0.5rem;
  font-size: 0.8rem;
  color: var(--dark-gray);
`;

const PokemonTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  margin: 0.2rem;
`;

const PokemonPrice = styled.h3`
  color: #777777;
  font-size: 0.8rem;
  margin: 0.8rem;
`;

export default PokemonCard;
