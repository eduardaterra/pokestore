import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import useFetchPokemon from "../hooks/useFetchPokemon";
import FiltersModalContext from "../contexts/FiltersModalContext";
import Filter from "../assets/images/filter.svg";
import LeftArrow from "../assets/images/left-arrow.svg";

type AsideProps = {
  slide: string;
  onClick: () => void;
};

const FiltersModal = () => {
  const [orderList, setOrderList] = useState<String[]>([]);
  const [typelist, setTypeList] = useState<String[]>([]);
  const [slide, setSlide] = useState("");
  const [showScrollbar, setShowScrollbar] = useState("unset");

  const { showFilters, setShowFilters, order, type, setType, setOrder } =
    useContext(FiltersModalContext);
  const { fetchPokemonProps, fetchPokemonTypes } = useFetchPokemon();

  document.body.style.overflow = showScrollbar;

  return (
    <>
      <FilterButton
        onClick={() => {
          setShowFilters(true);
          setShowScrollbar("hidden");
          fetchPokemonProps().then((res) => {
            setOrderList(res);
          });
          fetchPokemonTypes().then((res) => setTypeList(res));
          setSlide("slideIn");
        }}
      >
        <FilterImg src={Filter} />
      </FilterButton>
      {showFilters ? (
        <Overlay>
          <FilterAside slide={slide}>
            <ExitButton
              onClick={() => {
                setTimeout(() => {
                  setShowFilters(false);
                  setShowScrollbar("unset");
                }, 700);
                setSlide("slideOut");
              }}
            >
              <ExitImg src={LeftArrow} />
            </ExitButton>
            <Title>order by</Title>
            {orderList.map((prop) =>
              prop === "_id" ||
              prop === "__v" ||
              prop === "types" ||
              prop === "sprite" ? null : (
                <Link
                  to={
                    type === undefined || type === ""
                      ? `?order=${prop}`
                      : `?type=${type}&order=${prop}`
                  }
                  onClick={() => {
                    setShowFilters(false);
                    setShowScrollbar("unset");
                    setOrder(prop as string);
                  }}
                >
                  {prop}
                </Link>
              )
            )}
            <Title>type filters</Title>
            {typelist.map((type) => (
              <Link
                to={
                  order === undefined || order === ""
                    ? `?type=${type}`
                    : `?type=${type}&order=${order}`
                }
                onClick={() => {
                  setShowFilters(false);
                  setShowScrollbar("unset");
                  setType(type as string);
                }}
              >
                {type}
              </Link>
            ))}
          </FilterAside>
        </Overlay>
      ) : null}
    </>
  );
};

const FilterButton = styled.button`
  border: 1px solid var(--light-gay);
  border-radius: 100%;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FilterImg = styled.img`
  width: 2rem;
`;

const Overlay = styled.div`
  display: flex;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  min-height: 100%;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const FilterAside = styled.div<Pick<AsideProps, "slide">>`
  height: 100vh;
  width: 15rem;
  background: var(--main-white);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  position: absolute;
  animation: ${({ slide }) => slide} 0.7s ease-out;

  @keyframes slideIn {
    0% {
      transform: translateX(15rem);
    }
    100% {
      transform: translateX(0rem);
    }
  }
  @keyframes slideOut {
    0% {
      transform: translateX(0rem);
    }
    100% {
      transform: translateX(15rem);
    }
  }

  > a {
    color: var(--red);
    font-size: 0.75rem;
    text-decoration: underline;
    margin: 0 2rem 0.5rem 2rem;

    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const ExitButton = styled.button`
  border: 0;
  background: transparent;
  margin: 1rem 12rem 0 1rem;
`;
const ExitImg = styled.img`
  width: 2rem;
`;

const Title = styled.h1`
  color: var(--black);
  font-size: 1rem;
  margin: 1rem 2rem;
`;
export default FiltersModal;
