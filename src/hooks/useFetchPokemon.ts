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

const apiUrl = "https://pokestore-api.vercel.app/";

const useFetchPokemon = () => {
  return {
    fetchPokemonList,
    fetchPokemonSearch,
    fetchPokemonProps,
    fetchPokemonTypes,
  };
};

const fetchPokemonList = async (
  pokemonList: PokemonList,
  type: string | null,
  order: string | null
) => {
  const offset = pokemonList.length;

  const url =
    type !== null
      ? order !== null
        ? `${apiUrl}types/${type}?offset=${offset}&limit=20&order=${order}`
        : `${apiUrl}types/${type}?offset=${offset}&limit=20`
      : order !== null
      ? `${apiUrl}pokemon?offset=${offset}&limit=20&order=${order}`
      : `${apiUrl}pokemon?offset=${offset}&limit=20`;

  const { data } = await axios.get<PokemonApiRes>(url);
  const countResults = data.count === undefined ? 0 : data.count;

  return { count: countResults, results: [...pokemonList, ...data.results] };
};

const fetchPokemonSearch = async (
  searchList: PokemonList,
  params: string,
  type: string | null,
  order: string | null
) => {
  const offset = searchList.length;
  const url =
    type !== null
      ? order !== null
        ? `${apiUrl}types/${type}/pokemon/${params}?offset=${offset}&limit=20&order=${order}`
        : `${apiUrl}types/${type}/pokemon/${params}?offset=${offset}&limit=20`
      : order !== null
      ? `${apiUrl}pokemon/${params}?offset=${offset}&limit=20&order=${order}`
      : `${apiUrl}pokemon/${params}?offset=${offset}&limit=20`;

  const { data } = await axios.get<PokemonApiRes>(url);

  const countResults = data.count === undefined ? 0 : data.count;
  return { count: countResults, results: [...searchList, ...data.results] };
};

const fetchPokemonProps = async (): Promise<String[]> => {
  const { data } = await axios.get<PokemonApiRes>(`${apiUrl}pokemon/1`);
  return Object.keys(data.results[0]);
};

const fetchPokemonTypes = async (): Promise<String[]> => {
  const { data } = await axios.get<TypesApiRes>(`${apiUrl}types`);
  return Object.keys(data.routes);
};

export default useFetchPokemon;

