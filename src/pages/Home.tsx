import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import useFetchPokemon, { PokemonList } from "../hooks/useFetchPokemon";
import { PokemonInfoModalContext } from "../contexts/PokemonInfoModalContext";

import PokemonCard from "../components/PokemonCard";
import PokemonInfoModal from "../components/PokemonInfoModal";
import Spinner from "../components/Spinner";
import FiltersModal from "../components/FiltersModal";
import FiltersModalContext from "../contexts/FiltersModalContext";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonList>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [countPokemon, setCountPokemon] = useState(0);

  const { fetchPokemonList } = useFetchPokemon();

  const { showModal, setShowModal, pokemonInfo } = useContext(
    PokemonInfoModalContext
  );
  const { setOrder, setType } = useContext(FiltersModalContext);

  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const queryType = useQuery().get("type");
  const queryOrder = useQuery().get("order");

  useEffect(() => {
    fetchPokemonList(pokemonList, queryType, queryOrder).then((res) => {
      setType(queryType !== null ? queryType : "");
      setOrder(queryOrder !== null ? queryOrder : "");
      setCountPokemon(res.count);
      setPokemonList(res.results);
      setIsLoading(false);
      setShowFilters(true);
    });
  }, []);

  return (
    <>
      <PokemonInfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        pokemonInfo={pokemonInfo}
      />
      <HomeContainer>
        <ListWrapper>
          <PokemonListContainer>
            {pokemonList.map(({ ...pokemon }) => (
              <PokemonCard pokemon={pokemon} key={pokemon.key} />
            ))}
          </PokemonListContainer>
          <Footer>
            {isLoading ? (
              <Spinner />
            ) : countPokemon > pokemonList.length ? (
              <FetchMoreButton
                onClick={() => {
                  setIsLoading(true);

                  fetchPokemonList(pokemonList, queryType, queryOrder).then(
                    (res) => {
                      setPokemonList(res.results);
                      setTimeout(() => setIsLoading(false), 1000);
                    }
                  );
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

const HomeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  width: 100%;
  justify-content: center;
  margin: 1.6rem 0 0 6.2rem;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const FilterGap = styled.div`
  width: 6.2rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 2rem 6.2rem;
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

export default Home;
