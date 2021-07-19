import axios from "axios";

type PokemonApiRes = {
  results: PokemonList;
  count?: number;
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
  return { fetchPokemonList, fetchPokemonSearch };
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

const fetchPokemonSearch = async (searchList: PokemonList, params: string) => {
  const offset = searchList.length;
  const { data } = await axios.get<PokemonApiRes>(
    `https://pokestore-api.herokuapp.com/pokemon/${params}?offset=${offset}&limit=20`
  );

  const countResults = data.count === undefined ? 0 : data.count;
  return { count: countResults, results: [...searchList, ...data.results] };
};

export default useFetchPokemon;
