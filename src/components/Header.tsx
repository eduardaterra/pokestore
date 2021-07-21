import React, { FormEvent, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { CartContext } from "../contexts/CartContext";

import Logo from "../assets/images/logo.svg";
import Cart from "../assets/images/cart.svg";
import Search from "../assets/images/search-icon.svg";

const Header: React.FC = () => {
  const [searchPokemon, setSearchPokemon] = useState("");
  const { pokemonCartList } = useContext(CartContext);
  const history = useHistory();

  const handleCheckoutClick = () => {
    history.push("/checkout/cart");
  };

  const handleHomeClick = () => {
    history.push("/");
  };

  const handleSearchPokemon = (event: FormEvent) => {
    event.preventDefault();
    searchPokemon.trim().toLowerCase();
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
                  setSearchPokemon(event.target.value);
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
  z-index: 1;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--red);
`;
const LogoImage = styled.img`
  width: 12rem;
  margin: 1rem;
  cursor: pointer;
`;

const CartWrapper = styled.div`
  display: flex;
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
`;
const CartComponent = styled.img`
  width: 2.3rem;
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
`;

const SearchButton = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  transform: translate(-3.5rem, 1.3rem);
  cursor: pointer;
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

const HeaderWrapper = styled.div`
  display: flex;
`;
const HeaderFooter = styled.div`
  display: flex;
  background-color: var(--black);
  width: 100%;
  height: 1.4rem;
  box-shadow: inset 0px 0px 5px 4px #000000da;
  align-items: center;
  justify-content: center;
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
`;

export default Header;
