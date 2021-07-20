import axios from "axios";

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

type PokemonApiRes = {
  results: PokemonList;
  count?: number;
};

type TypesApiRes = {
  routes: { [key: string]: string };
};

export type PokemonList = Array<Pokemon>;

const useFetchPokemon = () => {
  return {
    fetchPokemonList,
    fetchPokemonSearch,
    fetchPokemonProps,
    fetchPokemonTypes,
  };
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

const fetchPokemonProps = async (): Promise<String[]> => {
  const { data } = await axios.get<PokemonApiRes>(
    `https://pokestore-api.herokuapp.com/pokemon/1`
  );
  return Object.keys(data.results[0]);
};

const fetchPokemonTypes = async (): Promise<String[]> => {
  const { data } = await axios.get<TypesApiRes>(
    `https://pokestore-api.herokuapp.com/types`
  );
  return Object.keys(data.routes);
};

export default useFetchPokemon;
