import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { PokemonInfoModalContext } from "../contexts/PokemonInfoModalContext";
import FiltersModalContext from "../contexts/FiltersModalContext";
import useFetchPokemon, { Pokemon } from "../hooks/useFetchPokemon";

import PokemonCard from "../components/PokemonCard";
import PokemonInfoModal from "../components/PokemonInfoModal";
import Spinner from "../components/Spinner";
import FiltersModal from "../components/FiltersModal";

const SearchResult = () => {
  const [searchList, setSearchList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countPokemon, setCountPokemon] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { showModal, setShowModal, pokemonInfo } = useContext(
    PokemonInfoModalContext
  );
  const { setOrder, setType } = useContext(FiltersModalContext);

  const { fetchPokemonSearch } = useFetchPokemon();

  const { pokemon }: { pokemon: string } = useParams();

  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const queryType = useQuery().get("type");
  const queryOrder = useQuery().get("order");

  useEffect(() => {
    fetchPokemonSearch(searchList, pokemon, queryType, queryOrder).then(
      (res) => {
        setType(queryType !== null ? queryType : "");
        setOrder(queryOrder !== null ? queryOrder : "");
        setSearchList(res.results);
        setCountPokemon(res.count);
        setIsLoading(false);
        setShowFilters(true);
      }
    );
  }, []);

  return (
    <>
      <PokemonInfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        pokemonInfo={pokemonInfo}
      />
      {<Title>you are seeing results for {pokemon}!</Title>}
      <HomeContainer>
        <ListWrapper>
          {searchList.length >= 4 ? (
            <PokemonListContainer>
              {searchList.map(({ ...pokemon }) => (
                <PokemonCard pokemon={pokemon} key={pokemon.key} />
              ))}
            </PokemonListContainer>
          ) : (
            <PokemonGridlessContainer>
              {searchList.map(({ ...pokemon }) => (
                <PokemonCard pokemon={pokemon} key={pokemon.key} />
              ))}
            </PokemonGridlessContainer>
          )}

          <Footer>
            {isLoading ? (
              <Spinner />
            ) : countPokemon > searchList.length ? (
              <FetchMoreButton
                onClick={() => {
                  setIsLoading(true);
                  fetchPokemonSearch(
                    searchList,
                    pokemon,
                    queryType,
                    queryOrder
                  ).then((res) => {
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
        {showFilters ? <FiltersModal /> : <FilterGap />}
      </HomeContainer>
    </>
  );
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: var(--gray);
  font-size: 1.3rem;
  width: 100%;
  margin: 1.6rem 0rem;
  text-align: center;
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 4.5rem;

  gap: 1.6rem;
`;

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  min-width: 100%;
  justify-content: center;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const PokemonGridlessContainer = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1.6rem 0 0 0rem;
  gap: 2rem;
`;
const FilterGap = styled.div`
  width: 6.2rem;
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
