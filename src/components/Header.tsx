import React, { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { CartContext } from "../contexts/CartContext";
import FiltersModalContext from "../contexts/FiltersModalContext";

import Logo from "../assets/images/logo.svg";
import Cart from "../assets/images/cart.svg";
import Search from "../assets/images/search-icon.svg";

const Header: React.FC = () => {
  const [searchPokemon, setSearchPokemon] = useState("");

  const { pokemonCartList } = useContext(CartContext);
  const { setShowFilters } = useContext(FiltersModalContext);

  const history = useHistory();

  const handleCheckoutClick = () => {
    history.push("/checkout/cart");
  };

  const handleHomeClick = () => {
    setShowFilters(false);
    history.push("/");
  };

  const handleSearchPokemon = (event: FormEvent) => {
    event.preventDefault();
    setShowFilters(false);
    if (searchPokemon === "") {
      return;
    }
    history.push(`/search/${searchPokemon}`);
  };
  return (
    <HeaderComponent>
      <HeaderContent>
        <HeaderElements>
          <LogoImage
            src={Logo}
            alt="Pokestore logo"
            onClick={handleHomeClick}
          />
          <HeaderWrapper>
            <CartWrapper onClick={handleCheckoutClick}>
              {pokemonCartList.length > 0 ? (
                <CounterComponent>
                  <p>{pokemonCartList.length}</p>
                </CounterComponent>
              ) : null}

              <CartComponent src={Cart} />
            </CartWrapper>
            <Form onSubmit={handleSearchPokemon}>
              <SearchInput
                type="text"
                placeholder="search for your pokémon here"
                onChange={(event) => {
                  setSearchPokemon(event.target.value.trimEnd().toLowerCase());
                }}
              />
              <SearchButton type="submit">
                <SearchIcon src={Search} />
              </SearchButton>
            </Form>
          </HeaderWrapper>
        </HeaderElements>
      </HeaderContent>
      <HeaderFooter>
        <PokeButton />
      </HeaderFooter>
    </HeaderComponent>
  );
};

const HeaderComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  z-index: 2;
  max-width: 100vw;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--red);

  @media (max-width: 600px) {
    height: 6.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const LogoImage = styled.img`
  width: 12rem;
  margin: 1rem;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 8rem;
    position: absolute;
    transform: translate(-1rem, -1.2rem);
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }
`;

const CartWrapper = styled.div`
  display: flex;
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
`;
const CartComponent = styled.img`
  width: 2.3rem;
  @media (max-width: 600px) {
    display: flex;
    width: 1.9rem;
    transform: translateY(0.9rem);
  }
`;
const CounterComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--yellow);
  transform: translate(100%, -20%);
  min-width: 1.3rem;
  min-height: 1.3rem;
  position: absolute;
  border-radius: 100%;
  font-size: 0.45rem;
  box-shadow: 1.5px 1.5px 3px 0.5px rgba(0, 0, 0, 0.25),
    inset 0px 9px 10px 2px rgba(255, 255, 255, 0.25);
  & > p {
    color: var(--blue);
    text-align: center;
  }
  @media (max-width: 600px) {
    transform: translate(1.5rem, 0.4rem);
    min-width: 1rem;
    min-height: 1rem;
  }
`;
const Form = styled.form``;

const SearchInput = styled.input`
  margin: 1rem;
  width: 20rem;
  height: 2rem;
  border: none;
  border-radius: 3rem;
  padding: 0.5rem;
  box-shadow: inset -10px -7px 5px -3px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  font-size: 0.6rem;
  padding: 1rem;
  &::placeholder {
    color: var(--light-gray);
    font-size: 0.55rem;
  }
  @media (max-width: 600px) {
    margin: 0.5rem;
    width: 20rem;
  }
  @media (max-width: 350px) {
    width: 18rem;
    &::placeholder {
      font-size: 0.5rem;
    }
  }
`;

const SearchButton = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  transform: translate(-3.5rem, 1.3rem);
  cursor: pointer;
  @media (max-width: 600px) {
    transform: translate(-3rem, 0.8rem);
  }
`;

const SearchIcon = styled.img`
  width: 1.3rem;
`;

const HeaderElements = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 1rem;
`;

const HeaderFooter = styled.div`
  display: flex;
  background-color: var(--black);
  width: 100%;
  height: 1.4rem;
  box-shadow: inset 0px 0px 5px 4px #000000da;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    height: 1.2rem;
  }
`;

const PokeButton = styled.div`
  display: flex;
  width: 3rem;
  height: 3rem;
  background-color: var(--black);
  box-shadow: inset 0px 0px 3px 2.5px #000000da;
  overflow: visible;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  position: relative;

  &:before {
    content: "";
    width: 2.1rem;
    height: 2.1rem;
    background-color: var(--white);
    box-shadow: 2px 7px 6px 2px rgba(0, 0, 0, 0.25);
    overflow: visible;
    border-radius: 100%;
    position: absolute;
  }
  &:after {
    content: "";
    width: 1rem;
    height: 1rem;
    background-color: var(--white);
    box-shadow: 2px 7px 6px 2px rgba(0, 0, 0, 0.25);
    overflow: visible;
    border-radius: 100%;
    position: absolute;
  }
  @media (max-width: 600px) {
    width: 2.8rem;
    height: 2.8rem;
    &:before {
      width: 2rem;
      height: 2rem;
    }
    &:after {
      width: 0.9rem;
      height: 0.9rem;
    }
  }
`;

export default Header;
