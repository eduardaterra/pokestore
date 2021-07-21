import { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { PokemonInfoModalContext } from "../contexts/PokemonInfoModalContext";
import FiltersModalContext from "../contexts/FiltersModalContext";
import useFetchPokemon, { Pokemon } from "../hooks/useFetchPokemon";

import PokemonCard from "../components/PokemonCard";
import PokemonInfoModal from "../components/PokemonInfoModal";
import Spinner from "../components/Spinner";

const SearchResult = () => {
  const [searchList, setSearchList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countPokemon, setCountPokemon] = useState(0);

  const { showModal, setShowModal, pokemonInfo } = useContext(
    PokemonInfoModalContext
  );
  const { path, setPath } = useContext(FiltersModalContext);

  const { fetchPokemonSearch } = useFetchPokemon();

  const { pokemon }: { pokemon: string } = useParams();

  useEffect(() => {
    fetchPokemonSearch(searchList, pokemon).then((res) => {
      setSearchList(res.results);
      setCountPokemon(res.count);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <PokemonInfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        pokemonInfo={pokemonInfo}
      />
      <ListWrapper>
        <PokemonListContainer>
          {searchList.map(({ ...pokemon }) => (
            <PokemonCard pokemon={pokemon} key={pokemon.key} />
          ))}
        </PokemonListContainer>
        <Footer>
          {isLoading ? (
            <Spinner />
          ) : countPokemon > searchList.length ? (
            <FetchMoreButton
              onClick={() => {
                setIsLoading(true);
                fetchPokemonSearch(searchList, pokemon).then((res) => {
                  setSearchList(res.results);
                  setTimeout(() => setIsLoading(false), 1000);
                });
              }}
            >
              View More
            </FetchMoreButton>
          ) : null}
        </Footer>
      </ListWrapper>
    </>
  );
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  max-width: 100%;
  justify-content: center;
  margin: 1.6rem 0 0 3rem;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem;
`;

const FetchMoreButton = styled.button`
  background: var(--red);
  color: var(--white);
  border: 0;
  border-radius: 30px;
  width: 20rem;
  height: 2.3rem;
  cursor: pointer;
`;

export default SearchResult;
