import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import useFetchPokemon from "../hooks/useFetchPokemon";
import PokemonColor, { A } from "../helpers/PokemonColor";
import PokemonType from "./PokemonType";
import PokemonImage from "./PokemonBg";

import Cart from "../assets/images/cart.svg";

type PokemonCardType = {
  name: string;
  types: string[];
  price: number;
  sprite: string;
  id: number;
};

const PokemonCard: React.FC<{ url: string }> = ({ url }) => {
  const { fetchPokemon } = useFetchPokemon();
  const [pokemon, setPokemon] = useState<PokemonCardType>({
    name: "",
    types: [""],
    price: 0,
    sprite: "",
    id: 0,
  });

  useEffect(() => {
    fetchPokemon(url).then((res) =>
      setPokemon({
        name: res.name,
        types: res.types,
        price: res.price,
        sprite: res.sprite,
        id: res.id,
      })
    );
  }, []);

  return (
    <PokemonCardComponent>
      <PokemonImageContainer>
        <PokemonImage pokeTypes={pokemon.types} pokeImg={pokemon.sprite} />
      </PokemonImageContainer>

      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonTypeContainer>
        {pokemon.types.map((type) => (
          <PokemonType
            pokemonColor={PokemonColor(type as A)}
            pokemonType={type}
          ></PokemonType>
        ))}
      </PokemonTypeContainer>
      <PokemonPrice> ¥ {pokemon.price}</PokemonPrice>
      <AddToCartButton onClick={() => {}}>
        <img src={Cart} alt="cart" /> add to cart
      </AddToCartButton>
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

const PokemonImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
`;

const PokemonName = styled.h2`
  justify-content: center;
  align-content: center;
  margin: 0.5rem;
  font-size: 1rem;
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

const AddToCartButton = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--red);
  border-radius: 1rem;
  color: var(--white);
  width: 10rem;
  height: 2rem;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  font-size: 0.6rem;
  & > img {
    height: 1.3rem;
  }
`;

export default PokemonCard;
