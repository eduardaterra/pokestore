import styled from "styled-components";
import { useContext } from "react";

import { Pokemon } from "../hooks/useFetchPokemon";
import { CartContext } from "../contexts/CartContext";
import { PokemonInfoModalContext } from "../contexts/PokemonInfoModalContext";

import PokemonColor, { A } from "../helpers/PokemonColor";

import AddToCartButton from "./AddToCartButton";
import PokemonType from "./PokemonType";
import PokemonImage from "./PokemonImage";

type ModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  pokemonInfo: Pokemon;
};

const PokemonInfoModal = (props: ModalProps) => {
  const { setShowScrollbar } = useContext(PokemonInfoModalContext);
  const { setPokemonCartList, pokemonCartList } = useContext(CartContext);

  const { showModal, setShowModal, pokemonInfo } = props;

  return showModal ? (
    <ModalOverlay>
      <ModalContainer>
        <PokemonContent>
          <PokemonImageContainer>
            <PokemonImage
              primaryColor={PokemonColor(pokemonInfo.types[0] as A)}
              secondaryColor={PokemonColor(pokemonInfo.types[1] as A)}
              pokeImg={pokemonInfo.sprite}
              pokemonImageSize={{ height: 16, width: 16 }}
            />
          </PokemonImageContainer>
          <PokemonAside>
            <PokemonNameContainer>
              {pokemonInfo.name.split("-")[0]}
              <p>
                ¥{" "}
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(pokemonInfo.price)}
              </p>
              <PokemonTypeContainer>
                {pokemonInfo.types.map((type) => (
                  <PokemonType
                    pokemonColor={PokemonColor(type as A)}
                    pokemonType={type}
                    fontSize={0.6}
                    backgroundSize={{ height: 1.6, width: 5.8 }}
                    key={type}
                  />
                ))}
              </PokemonTypeContainer>
            </PokemonNameContainer>

            <PokemonInfoContainer>
              key:{" "}
              <strong>#{pokemonInfo.key.toString().padStart(2, "0")}</strong>
              <br />
              base experience: <strong>{pokemonInfo.base_experience}exp</strong>
              <br />
              height: <strong>{pokemonInfo.height / 10}m</strong>
              <br />
              weight: <strong>{pokemonInfo.weight / 10}kg</strong>
              <br />
            </PokemonInfoContainer>
            <Footer>
              <AddToCartButton
                fontSize={0.8}
                iconSize={1.8}
                backgroundSize={{
                  height: 2.5,
                  width: 14,
                }}
                onClick={() => {
                  setPokemonCartList([...pokemonCartList, pokemonInfo]);
                }}
              />
            </Footer>
          </PokemonAside>
        </PokemonContent>
        <CloseModal
          onClick={() => {
            setShowModal(false);
            setShowScrollbar("unset");
          }}
        >
          X
        </CloseModal>
      </ModalContainer>
    </ModalOverlay>
  ) : null;
};

const ModalOverlay = styled.div`
  display: flex;
  position: fixed;
  transform: translateY(-6.4rem);
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  min-height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    transform: translateY(-4.69rem);
  }
`;

const ModalContainer = styled.div`
  background: var(--main-white);
  height: 22rem;
  width: 46rem;
  padding: 1rem;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  @media (max-width: 600px) {
    width: 18rem;
    height: 30rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
`;

const PokemonContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 20rem;
  width: 46rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PokemonImageContainer = styled.div`
  @media (max-width: 600px) {
    margin: 0.5rem;
  }
`;

const PokemonAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  height: 90%;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PokemonNameContainer = styled.h1`
  color: var(--dark-gray);
  font-size: 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > p {
    margin: 0.5rem;
    color: var(--gray);
    font-size: 0.9rem;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    align-items: center;
    > p {
      font-size: 0.7rem;
    }
  }
`;
const PokemonTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  @media (max-width: 600px) {
    margin-bottom: 0.8rem;
  }
`;

const PokemonInfoContainer = styled.div`
  line-height: 1.4rem;
  font-size: 0.9rem;
  color: var(--gray);
  > strong {
    color: var(--dark-gray);
  }
  @media (max-width: 600px) {
    line-height: 0.9rem;
    font-size: 0.5rem;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-left: 20%;
  @media (max-width: 600px) {
    align-items: center;
    justify-content: center;
    margin: 0.8rem 0;
  }
`;

const CloseModal = styled.button`
  background: transparent;
  border: 0;
  color: var(--light-gray);
  font-size: 2rem;
  cursor: pointer;
  @media (max-width: 600px) {
    position: absolute;
    transform: translate(7rem, -13rem);
    font-size: 1.5rem;
  }
`;

export default PokemonInfoModal;
