import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

import { PokemonInfoModalContext } from "../contexts/PokemonInfoModalContext";
import FiltersModalContext from "../contexts/FiltersModalContext";
import useFetchPokemon, { Pokemon } from "../hooks/useFetchPokemon";

import PokemonCard from "../components/PokemonCard";
import PokemonInfoModal from "../components/PokemonInfoModal";
import Spinner from "../components/Spinner";
import FiltersModal from "../components/FiltersModal";

import Dragonite from "../assets/images/dragonite.svg";

const SearchResult = () => {
  const [isDragoniteLoading, setIsDragoniteLoading] = useState(true);
  const [searchList, setSearchList] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [countPokemon, setCountPokemon] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { showModal, setShowModal, pokemonInfo } = useContext(
    PokemonInfoModalContext
  );
  const { setOrder, setType, type, order } = useContext(FiltersModalContext);

  const { fetchPokemonSearch } = useFetchPokemon();

  const { pokemon }: { pokemon: string } = useParams();

  const location = useLocation();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const queryType = useQuery().get("type");
  const queryOrder = useQuery().get("order");

  const img = new Image();
  img.onload = () => {
    setIsDragoniteLoading(false);
  };
  img.src = Dragonite;

  useEffect(() => {
    fetchPokemonSearch(searchList, pokemon, queryType, queryOrder).then(
      (res) => {
        setType(queryType !== null ? queryType : "");
        setOrder(queryOrder !== null ? queryOrder : "");
        setSearchList(res.results);
        setCountPokemon(res.count);
        setIsLoading(false);
        setIsFetching(false);
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
        key={pokemonInfo.key}
      />
      <HomeContainer>
        <ListWrapper>
          <TitleContainer>
            {isLoading ? null : type === "" && order === "" ? (
              <Title>results for {pokemon}</Title>
            ) : (
              <>
                <Title>results for {pokemon}</Title>
                {order === "" ? (
                  type !== "" ? (
                    <Subtitle>filtered by {type}</Subtitle>
                  ) : null
                ) : type === "" ? (
                  <Subtitle>ordered by {order}</Subtitle>
                ) : (
                  <Subtitle>
                    filtered by {type} and ordered by {order}
                  </Subtitle>
                )}
              </>
            )}
          </TitleContainer>
          <FilterContainer>
            {showFilters && searchList.length > 4 ? <FiltersModal /> : null}
          </FilterContainer>
          {isLoading ? null : searchList.length === 0 ? (
            isDragoniteLoading ? null : (
              <PokemonNotFoundContainer>
                <img src={Dragonite} alt="dragonite" />
                <p>{`the pokédex doesn't have any info about this pokémon :(`}</p>
                <Link to="/">return to the home</Link>
              </PokemonNotFoundContainer>
            )
          ) : searchList.length >= 4 ? (
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
            {isFetching ? (
              <Spinner />
            ) : countPokemon > searchList.length ? (
              <FetchMoreButton
                onClick={() => {
                  setIsFetching(true);
                  fetchPokemonSearch(
                    searchList,
                    pokemon,
                    queryType,
                    queryOrder
                  ).then((res) => {
                    setSearchList(res.results);
                    setTimeout(() => setIsFetching(false), 1000);
                  });
                }}
              >
                View More
              </FetchMoreButton>
            ) : null}
          </Footer>
        </ListWrapper>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  @media (max-width: 600px) {
    flex-direction: column;
    margin-top: 1.6rem;
  }
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
  @media (max-width: 600px) {
    width: 100%;
    margin: 3.8rem 0 1rem 0;
  }
`;

const Title = styled.h1`
  color: var(--gray);
  font-size: 1.3rem;

  @media (max-width: 1000px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    width: 60%;
    text-align: center;
    line-height: 1rem;
    font-size: 0.58rem;
    margin: 0 0 1rem 1rem;
  }
`;

const Subtitle = styled.p`
  margin-top: 1.6rem;
  color: var(--light-gray);
  font-size: 0.8rem;
  @media (max-width: 600px) {
    font-size: 0.48rem;
    margin: 0 0 1rem 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  position: absolute;
`;

const PokemonNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 6rem 0 0 0rem;

  > img {
    width: 12rem;
    opacity: 0.5;
    margin: 0 0 1rem 0;
  }
  > p {
    font-size: 0.8rem;
    color: var(--gray);
    text-align: center;
    line-height: 1rem;
  }

  > a {
    color: var(--light-gray);
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    margin: 0;
    > img {
      margin-left: 2rem;
      width: 8rem;
    }
    > p {
      font-size: 0.6rem;
      width: 90%;
    }
    > a {
      font-size: 0.55rem;
    }
  }
`;

const PokemonListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  width: 100%;
  justify-content: center;
  column-gap: 2rem;
  row-gap: 2rem;

  @media (max-width: 1000px) {
    gap: 1rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, auto);
    gap: 1rem;
  }
`;

const PokemonGridlessContainer = styled.div`
  display: flex;
  gap: 2rem;
  min-width: 100%;
  justify-content: center;
  width: 100%;
  @media (max-width: 1000px) {
    gap: 1rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, auto);
    gap: 1rem;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  @media (max-width: 600px) {
    margin: 2rem 0;
  }
`;

const FetchMoreButton = styled.button`
  background: var(--red);
  color: var(--white);
  border: 0;
  border-radius: 30px;
  width: 20rem;
  height: 2.3rem;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 15rem;
    height: 2rem;
    font-size: 0.8rem;
  }
`;

export default SearchResult;
