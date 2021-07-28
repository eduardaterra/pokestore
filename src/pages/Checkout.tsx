import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { CartContext } from "../contexts/CartContext";

import CartProducts from "../components/CartProducts";
import ConcludedShoppingModal from "../components/ConcludedShoppingModal";

import emptyPokeball from "../assets/images/empty-pokeball.svg";
import Cart from "../assets/images/cart.svg";

type isActive = {
  filter: string;
  cursor: string;
};

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const {
    totalItems,
    totalPrice,
    groupedCartList,
    pokemonCartList,
    setPokemonCartList,
  } = useContext(CartContext);

  const history = useHistory();

  const img = new Image();
  img.onload = () => {
    setIsLoading(false);
  };
  img.src = emptyPokeball;

  return !isLoading ? (
    <>
      <ConcludedShoppingModal showModal={showModal} />
      <CheckoutContainer>
        <CartListContainer>
          <Title>
            <h1>cart</h1>
            {totalItems !== 0 ? <p>{`(${totalItems} pokémon)`}</p> : null}
          </Title>
          <ProductContainer>
            {totalItems === 0 ? (
              <>
                <EmptyCart src={emptyPokeball} />
                <p>{"There is no pokémon here... Gotta catch'em all!"}</p>
              </>
            ) : (
              Object.keys(groupedCartList).map((key) => {
                const pokemonList = groupedCartList[Number(key)];
                const filteredPokemon = pokemonList.find(
                  (firstPokemon) => firstPokemon
                );
                return filteredPokemon === undefined ? null : (
                  <CartProducts
                    pokemon={filteredPokemon}
                    pokemonList={pokemonList}
                  />
                );
              })
            )}
          </ProductContainer>
        </CartListContainer>
        <SummaryContainer>
          <Title>
            <h1>summary</h1>
          </Title>
          <Summary>
            <p>
              quantity: <strong>{totalItems} pokémon</strong>
              <br />
              total: <strong>¥ {totalPrice}</strong>
            </p>
            <ButtonsContainer>
              <CleanCartButton
                onClick={() => setPokemonCartList([])}
                filter={pokemonCartList.length === 0 ? "opacity(0.5)" : "none"}
                cursor={
                  pokemonCartList.length === 0 ? "not-allowed" : "pointer"
                }
              >
                REMOVE ALL POKEMON
              </CleanCartButton>
              <BuyButton
                onClick={
                  pokemonCartList.length > 0
                    ? () => {
                        setPokemonCartList([]);
                        setShowModal(true);
                        setTimeout(() => {
                          setShowModal(false);
                          history.push("/");
                        }, 3000);
                      }
                    : () => {}
                }
                filter={pokemonCartList.length === 0 ? "opacity(0.5)" : "none"}
                cursor={
                  pokemonCartList.length === 0 ? "not-allowed" : "pointer"
                }
              >
                <img src={Cart} alt="CartImage" />
                BUY
              </BuyButton>
              <Link to="/">add more pokemon</Link>
            </ButtonsContainer>
          </Summary>
        </SummaryContainer>
      </CheckoutContainer>
    </>
  ) : null;
};

const CheckoutContainer = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-top: 1.6rem;
  position: fixed;
  gap: 2rem;
`;

const CartListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--light-gray);
  border-radius: 1rem;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);

  padding: 1rem;
  width: 60vw;
  max-height: 81vh;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
  > h1 {
    color: var(--black);
    font-size: 1.3rem;
  }
  > p {
    color: var(--gray);
    font-size: 0.8rem;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  gap: 0.5rem;
  > p {
    color: var(--gray);
    font-size: 0.8rem;
    width: 22rem;
    text-align: center;
    line-height: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const EmptyCart = styled.img`
  width: 14rem;
  opacity: 0.5;
`;

const SummaryContainer = styled.div`
  width: 25vw;
  height: 35vh;
  border: 1px solid var(--light-gray);
  border-radius: 1rem;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  > p {
    color: var(--gray);
    font-size: 0.8rem;
    > strong {
      color: var(--black);
    }
  }
`;
const Summary = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  > p {
    color: var(--gray);
    font-size: 0.8rem;
    line-height: 2rem;
    margin: 1rem;
    > strong {
      color: var(--black);
    }
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  > a {
    color: var(--gray);
    font-size: 0.55rem;
    text-decoration: underline;
    margin: 0 auto;
    &:hover {
      filter: brightness(0.8);
    }
  }
`;

const CleanCartButton = styled.button<Pick<isActive, "filter" | "cursor">>`
  border: 1px solid var(--red);
  border-radius: 10rem;
  background: #fff;
  color: red;
  font-size: 0.6rem;
  width: 100%;
  height: 2rem;
  cursor: pointer;
  cursor: ${({ cursor }) => cursor};
  filter: ${({ filter }) => filter};

  &:hover {
    filter: ${({ filter }) =>
      filter === "opacity(0.5)" ? "opacity(0.5)" : "brightness(0.8)"};
  }
`;

const BuyButton = styled.button<Pick<isActive, "filter" | "cursor">>`
  border: 0;
  border-radius: 10rem;
  background: var(--red);
  color: white;
  font-size: 0.7rem;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: ${({ cursor }) => cursor};
  filter: ${({ filter }) => filter};

  &:hover {
    filter: ${({ filter }) =>
      filter === "opacity(0.5)" ? "opacity(0.5)" : "brightness(0.8)"};
  }
  > img {
    width: 1.5rem;
  }
`;

export default Checkout;
