import axios from "axios";

type PokemonApiRes = {
  results: PokemonList;
};

export type PokemonList = Array<{
  name: string;
  url: string;
}>;

type PokemonApi = {
  name: string;
  types: PokemonTypes;
  base_experience: number;
  id: number;
  height: number;
  weight: number;
};

type PokemonTypes = Array<{ type: { name: string } }>;

export type Pokemon = {
  name: string;
  types: string[];
  base_experience: number;
  id: number;
  height: number;
  weight: number;
  price: number;
  sprite: string;
};

const useFetchPokemon = () => {
  return { fetchPokemonList, fetchPokemon };
};

const fetchPokemonList = async (
  pokemonList: PokemonList
): Promise<PokemonList> => {
  const offset = pokemonList.length;
  const { data } = await axios.get<PokemonApiRes>(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
  );
  return [...pokemonList, ...data.results];
};

const fetchPokemon = async (url: string): Promise<Pokemon> => {
  const { data } = await axios.get<PokemonApi>(url);
  const pokemonPrice = data.base_experience * 100;
  const pokemonSprite = `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`;
  const pokemonTypes = data.types.map(({ type }) => type.name);

  return {
    name: data.name,
    types: pokemonTypes,
    base_experience: data.base_experience,
    id: data.id,
    height: data.height,
    weight: data.weight,
    price: pokemonPrice,
    sprite: pokemonSprite,
  };
};

export default useFetchPokemon;
