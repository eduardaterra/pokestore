import { useEffect } from "react";
import { useState } from "react";
import useFetchPokemon from "../hooks/useFetchPokemon";

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

  return <div></div>;
};
export default PokemonCard;
