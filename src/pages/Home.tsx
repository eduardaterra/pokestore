import { useState, useEffect } from "react";
import useFetchPokemon, { PokemonList } from "../hooks/useFetchPokemon";
import PokemonCard from "../components/PokemonCard";
const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonList>([]);
  const { fetchPokemonList } = useFetchPokemon();

  useEffect(() => {
    fetchPokemonList(pokemonList).then((res) => setPokemonList(res));
  }, []);

  return (
    <div>
      {pokemonList.map(({ url }) => (
        <PokemonCard url={url} />
      ))}
    </div>
  );
};
export default Home;
