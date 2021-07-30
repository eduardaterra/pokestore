import { useState } from "react";
import styled from "styled-components";
import Pikachu from "../assets/images/pikachu.svg";

type ModalProps = {
  showModal: boolean;
};

const ConcludedShoppingModal = (props: ModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(3);
  const { showModal } = props;

  const img = new Image();
  img.onload = () => {
    setIsLoading(false);
  };
  img.src = Pikachu;

  if (time > 0 && showModal) {
    setTimeout(() => {
      setTime(time - 1);
    }, 1000);
  }

  return showModal && !isLoading ? (
    <ModalOverlay>
      <ModalContainer>
        <h1>thanks for your preference!</h1>
        <img src={Pikachu} alt="pikachu" />
        <p>returning to home in {time}</p>
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
  height: 23rem;
  width: 46rem;
  padding: 1rem;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  > h1 {
    color: var(--dark-gray);
    font-size: 1.5rem;
  }
  > p {
    color: var(--gray);
    font-size: 1rem;
  }
  > img {
    width: 10rem;
    animation: upDown 1.2s ease-out infinite;
    @keyframes upDown {
      0% {
        transform: translate(0.2rem, 0rem);
      }
      50% {
        transform: translate(-0.2rem, 0.5rem);
      }
      100% {
        transform: translate(0.2rem, 0rem);
      }
    }
  }
  @media (max-width: 600px) {
    height: 20rem;
    width: 90%;
    > h1 {
      font-size: 1rem;
      text-align: center;
    }
  }
  > img {
    width: 8rem;
  }
  > p {
    font-size: 0.6rem;
  }
`;

export default ConcludedShoppingModal;
