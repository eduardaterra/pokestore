import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import useFetchPokemon, { PokemonList } from "../hooks/useFetchPokemon";
import { PokemonInfoModalContext } from "../contexts/PokemonInfoModalContext";

import Header from "../components/Header";
import PokemonCard from "../components/PokemonCard";
import PokemonInfoModal from "../components/PokemonInfoModal";

const Home = () => {
  const [pokemonList, setPokemonList] = useState<PokemonList>([]);
  const { fetchPokemonList } = useFetchPokemon();
  const [isLoading, setIsLoading] = useState(true);
  const { showModal, setShowModal, pokemonInfo } = useContext(
    PokemonInfoModalContext
  );

  useEffect(() => {
    fetchPokemonList(pokemonList).then((res) => {
      setPokemonList(res);
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
          {pokemonList.map(({ url }) => (
            <PokemonCard url={url} />
          ))}
        </PokemonListContainer>
        <Footer>
          {isLoading ? (
            <Spinner />
          ) : (
            <FetchMoreButton
              onClick={() => {
                setIsLoading(true);

                fetchPokemonList(pokemonList).then((res) => {
                  setPokemonList(res);
                  setTimeout(() => setIsLoading(false), 1000);
                });
              }}
            >
              View More
            </FetchMoreButton>
          )}
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
  width: 100%;
  justify-content: center;
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
const Spinner = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3564af;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 0rem auto;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Home;
