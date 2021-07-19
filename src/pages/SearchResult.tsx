import { useContext } from "react";
import { useParams } from "react-router-dom";
import SearchContext from "../contexts/SearchContext";

const SearchResult = () => {
  const { searchPokemon } = useContext(SearchContext);
  const { pokemon }: { pokemon: string } = useParams();

  return <div></div>;
};
export default SearchResult;
