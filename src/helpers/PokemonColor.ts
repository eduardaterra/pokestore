export type A =
  | "normal"
  | "fighting"
  | "grass"
  | "flying"
  | "poison"
  | "ground"
  | "rock"
  | "bug"
  | "ghost"
  | "steel"
  | "fire"
  | "water"
  | "electric"
  | "psychic"
  | "ice"
  | "dragon"
  | "dark"
  | "fairy"
  | "unknown";

const PokemonColor = (type: A) => {
  const colorTypes: { [K in A]: string } = {
    grass: "#72D211",
    normal: "#baaea5",
    fighting: "#c92222",
    flying: "#759eee",
    poison: "#b553e3",
    ground: "#f9f377",
    rock: "#b7af6c",
    bug: "#bfdb70",
    ghost: "#6834ab",
    steel: "#afafaf",
    fire: "#ed0d0d",
    water: "#1ec8ed",
    electric: "#fdc500",
    psychic: "#cb115f",
    ice: "#97eafd",
    dragon: "#605cff",
    dark: "#53446b",
    fairy: "#eda3ea",
    unknown: "#fafafa",
  };

  return colorTypes[type];
};
export default PokemonColor;
