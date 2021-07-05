import React from "react";
import styled from "styled-components";
import Logo from "../assets/images/logo.svg";
import Cart from "../assets/images/cart.svg";
import Search from "../assets/images/search-icon.svg";

const Header: React.FC = () => {
  return (
    <HeaderComponent>
      <HeaderContent>
        <HeaderElements>
          <LogoImage src={Logo} alt="Pokestore logo" />
          <HeaderWrapper>
            <CartWrapper>
              <CounterComponent>
                <p>1</p>
              </CounterComponent>
              <CartComponent src={Cart} />
            </CartWrapper>
            <SearchContainer>
              <SearchInput
                type="text"
                placeholder="search for your pokemon here"
              />
              <SearchButton>
                <SearchIcon src={Search} />
              </SearchButton>
            </SearchContainer>
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
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
`;
const CartComponent = styled.img`
  width: 2.3rem;
  margin: 0.5rem;
  cursor: pointer;
`;
const CounterComponent = styled.div`
  background-color: var(--yellow);
  width: 1.4rem;
  height: 1.4rem;
  position: absolute;
  border-radius: 100%;
  font-size: 0.6rem;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.25),
    inset 0px 9px 10px 2px rgba(255, 255, 255, 0.25);
  & > p {
    color: var(--blue);
    text-align: center;
    padding: 30% 0;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

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
  position: relative;
  &::placeholder {
    color: var(--light-gray);
    font-size: 0.55rem;
  }
`;

const SearchButton = styled.button`
  border: 0;
  background: transparent;
  position: absolute;
  margin: 1.2rem;
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
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.25),
    inset 0px 10px 10px 0px rgba(255, 255, 255, 0.25);
  align-items: center;
  justify-content: center;
`;

const PokeButton = styled.div`
  display: flex;
  width: 3rem;
  height: 3rem;
  background-color: var(--black);
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25),
    inset 0px 9px 10px 2px rgba(255, 255, 255, 0.25);
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
