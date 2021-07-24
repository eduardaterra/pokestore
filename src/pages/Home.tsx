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
  const { setOrder, setType, type, order } = useContext(FiltersModalContext);

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
          <TitleContainer>
            {isLoading ? null : type === "" && order === "" ? null : (
              <>
                {type === "" ? null : (
                  <Title>results for all {type} type pokémon</Title>
                )}
                {order === "" ? null : <Subtitle>ordered by {order}</Subtitle>}
              </>
            )}
          </TitleContainer>
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
`;

const TitleContainer = styled.div`
  margin: 1.6rem 0 0rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const Title = styled.h1`
  margin: 0rem 0 1rem 6.2rem;
  color: var(--gray);
  font-size: 1.3rem;
  text-align: start;
`;

const Subtitle = styled.p`
  margin: 0 0 1.6rem 6.2rem;
  color: var(--light-gray);
  font-size: 0.8rem;
`;

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
`;

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  width: 100%;
  justify-content: center;
  margin: 0 0 0 4.5rem;
  column-gap: 2rem;
  row-gap: 2rem;
`;

const FilterGap = styled.div`
  width: 3rem;
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
