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
  const { setShowModal, setPokemonInfo, setShowScrollbar } = useContext(
    PokemonInfoModalContext
  );

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
          setShowScrollbar("hidden");
        }}
      />

      <PokemonName>
        {pokemon.name}{" "}
        <strong>#{pokemon.key.toString().padStart(2, "0")}</strong>
      </PokemonName>
      <PokemonTypeContainer>
        {pokemon.types.map((type) => (
          <PokemonType
            pokemonColor={PokemonColor(type as A)}
            pokemonType={type}
            fontSize={0.45}
            backgroundSize={{ height: 1.33, width: 4.4 }}
            key={type}
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
  border-radius: 1rem;
  width: 14rem;
  height: 18rem;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);

  align-items: center;
  @media (max-width: 1000px) {
    width: 10rem;
    height: 15rem;
  }
  @media (max-width: 350px) {
    width: 9rem;
  }
`;

const PokemonName = styled.h2`
  justify-content: center;
  align-content: center;
  text-align: center;
  margin: 0.5rem;
  font-size: 0.8rem;
  color: var(--dark-gray);
  > strong {
    color: var(--gray);
    font-size: 0.6rem;
  }
  @media (max-width: 1000px) {
    font-size: 0.55rem;
    > strong {
      font-size: 0.45rem;
    }
  }
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
  @media (max-width: 1000px) {
    font-size: 0.6rem;
  }
`;

export default PokemonCard;
