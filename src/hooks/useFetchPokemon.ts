import axios from "axios";

type PokemonApiRes = {
  results: PokemonList;
};

export type PokemonList = Array<Pokemon>;

export type Pokemon = {
  name: string;
  types: string[];
  base_experience: number;
  key: number;
  height: number;
  weight: number;
  price: number;
  sprite: string;
};

const useFetchPokemon = () => {
  return { fetchPokemonList };
};

const fetchPokemonList = async (
  pokemonList: PokemonList
): Promise<PokemonList> => {
  const offset = pokemonList.length;
  const { data } = await axios.get<PokemonApiRes>(
    `https://pokestore-api.herokuapp.com/pokemon?offset=${offset}&limit=20`
  );
  return [...pokemonList, ...data.results];
};

export default useFetchPokemon;
