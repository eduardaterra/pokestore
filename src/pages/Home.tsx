import { useState, useEffect } from "react";
import useFetchPokemon, { PokemonList } from "../hooks/useFetchPokemon";
import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import styled from "styled-components";
const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonList>([]);
  const { fetchPokemonList } = useFetchPokemon();

  useEffect(() => {
    fetchPokemonList(pokemonList).then((res) => setPokemonList(res));
  }, []);

  return (
    <>
      <Header />
      <PokemonListContainer>
        {pokemonList.map(({ url }) => (
          <PokemonCard url={url} />
        ))}
      </PokemonListContainer>
    </>
  );
};
const PokemonListContainer = styled.div``;

export default Home;
