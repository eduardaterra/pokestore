import { useContext } from "react";
import styled from "styled-components";

import { CartContext } from "../contexts/CartContext";

import { Pokemon } from "../hooks/useFetchPokemon";

import PokemonImage from "./PokemonImage";
import PokemonType from "./PokemonType";

import PokemonColor, { A } from "../helpers/PokemonColor";

const CartProducts: React.FC<{ pokemon: Pokemon; pokemonList: Pokemon[] }> = ({
  pokemon,
  pokemonList,
}) => {
  const { pokemonCartList, setPokemonCartList } = useContext(CartContext);

  const handleDeletePokemon = (arr: Pokemon[], pokemon: Pokemon) => {
    var index = arr.indexOf(pokemon);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    setPokemonCartList([...pokemonCartList]);
  };

  return (
    <Container>
      <div>
        <PokemonImage
          primaryColor={PokemonColor(pokemon.types[0] as A)}
          secondaryColor={PokemonColor(pokemon.types[1] as A)}
          pokeImg={pokemon.sprite}
          pokemonImageSize={{ height: 5.5, width: 5.5 }}
          onClick={() => {}}
        />
      </div>
      <PokemonItem>
        <TopContainer>
          <PokemonTitle>
            <PokemonName>{pokemon.name}</PokemonName>
            <PokemonTypeContainer>
              {pokemon.types.map((type) => (
                <PokemonType
                  pokemonColor={PokemonColor(type as A)}
                  pokemonType={type}
                  fontSize={0.35}
                  backgroundSize={{ height: 1, width: 3.5 }}
                />
              ))}
            </PokemonTypeContainer>
          </PokemonTitle>

          <PokemonInfoContainer>
            key: <strong>#{pokemon.key.toString().padStart(2, "0")}</strong>
            <br />
            base experience:
            <strong>{pokemon.base_experience}exp</strong>
            <br />
            height: <strong>{pokemon.height / 10}m</strong>
            <br />
            weight: <strong>{pokemon.weight / 10}kg</strong>
            <br />
          </PokemonInfoContainer>
        </TopContainer>

        <BottomContainer>
          <QuantityContainer>
            <Button
              onClick={() => handleDeletePokemon(pokemonCartList, pokemon)}
            >
              -
            </Button>
            <Quantity>{pokemonList.length}</Quantity>
            <Button
              onClick={() => setPokemonCartList([...pokemonCartList, pokemon])}
            >
              +
            </Button>
          </QuantityContainer>
          <PriceContainer>
            <p>
              price: <strong>¥ {pokemon.price * pokemonList.length}</strong>
            </p>
          </PriceContainer>
        </BottomContainer>
      </PokemonItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid var(--light-gray);
  &:last-child {
    border: 0;
  }
  @media (max-width: 600px) {
    gap: 0;
    align-items: flex-start;
    margin: 0.5rem;
  }
`;

const PokemonItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  gap: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;
const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  @media (max-width: 600px) {
    gap: 0.7rem;
  }
`;

const PokemonTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  > p {
    color: var(--gray);
    font-size: 0.5rem;
    text-align: center;
    line-height: 1rem;
  }
  @media (max-width: 600px) {
    min-width: 5.59rem;
  }
`;

const PokemonInfoContainer = styled.div`
  line-height: 1rem;
  font-size: 0.5rem;
  color: var(--gray);
  > strong {
    color: var(--dark-gray);
  }
  @media (max-width: 600px) {
    font-size: 0.35rem;
  }
`;

const PokemonName = styled.h1`
  color: var(--black);
  font-size: 0.7rem;
  @media (max-width: 600px) {
    font-size: 0.5rem;
  }
`;
const PokemonTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  margin: 0.5rem 0;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  @media (max-width: 600px) {
    width: 95%;
    font-size: 0.5rem;
    margin: 0.5rem 0 1rem 0rem;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 5rem;
  height: 1.5rem;
  border: 1px solid var(--light-gray);
  @media (max-width: 600px) {
    min-width: 3rem;
    height: 1rem;
  }
`;

const Button = styled.button`
  border: none;
  background: var(--red);
  color: var(--white);
  font-size: 0.8rem;
  height: 100%;
  width: 30.33%;
  cursor: pointer;
  &:active {
    background: #d4d4d4;
    color: var(--red);
    filter: brightness(1);
  }
  @media (max-width: 600px) {
    font-size: 0.35rem;
  }
`;
const Quantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 39.33%;
  height: 100%;
  font-size: 0.7rem;
  @media (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const PriceContainer = styled.div`
  > p {
    color: var(--gray);
    font-size: 0.6rem;
    > strong {
      color: var(--dark-gray);
    }
  }
  @media (max-width: 600px) {
    > p {
      font-size: 0.5rem;
    }
  }
`;

export default CartProducts;
