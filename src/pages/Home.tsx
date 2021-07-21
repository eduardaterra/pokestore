import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

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
  const { setPath, setOrder } = useContext(FiltersModalContext);

  const { type }: { type: string } = useParams();
  const { order }: { order: string } = useParams();

  useEffect(() => {
    fetchPokemonList(pokemonList, type, order).then((res) => {
      setOrder(order);
      setPath("/");
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

                  fetchPokemonList(pokemonList, type, order).then((res) => {
                    setOrder(order);
                    setPath("/");
                    setPokemonList(res.results);
                    setTimeout(() => setIsLoading(false), 1000);
                  });
                }}
              >
                View More
              </FetchMoreButton>
            ) : null}
          </Footer>
        </ListWrapper>
        {showFilters ? <FiltersModal /> : null}
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
