import styled from "styled-components";

const Spinner = () => {
  return (
    <LoadingMovingContainer>
      <PokeballContainer>
        <Pokeball>
          <PokeballDetails />
        </Pokeball>
      </PokeballContainer>
    </LoadingMovingContainer>
  );
};

const LoadingMovingContainer = styled.div`
  width: 3rem;
  height: 3rem;
  position: relative;
  animation: translating 1.5s infinite;
  @keyframes translating {
    0% {
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
    }
    50% {
      transform: translateX(50%);
      -webkit-transform: translateX(50%);
    }
    100% {
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
    }
  }
`;

const PokeballContainer = styled.div`
  width: 3rem;
  height: 3rem;
  animation: spinning 1.5s infinite;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.25));
  @keyframes spinning {
    0% {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
    50% {
      transform: rotate(325deg);
      -webkit-transform: rotate(325deg);
    }
    100% {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }
`;

const Pokeball = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  border-radius: 50%;
  position: relative;

  overflow: hidden;

  &:before {
    content: "";
    background-color: red;
    border-radius: 1.5rem 1.5rem 0 0;
    width: 3rem;
    height: 1.5rem;
    position: absolute;
  }
`;

const PokeballDetails = styled.div`
  width: 3rem;
  height: 0.3rem;
  background-color: #333;
  position: absolute;
  top: 1.44rem;
  &:before {
    content: "";
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: #333;
    position: absolute;
    top: -0.384rem;
    left: 0.96rem;
    z-index: 200;
  }
  &:after {
    content: "";
    width: 0.48rem;
    height: 0.48rem;
    border: 0.18rem solid white;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    top: -0.21rem;
    left: 1.104rem;
    margin: 0 auto;
    z-index: 250;
    animation: color-change 1.5s infinite;
    @keyframes color-change {
      0%,
      20%,
      40%,
      60%,
      100% {
        background-color: #fff;
      }
      10%,
      30%,
      50%,
      70%,
      90% {
        background-color: #f00;
      }
    }
  }
`;

export default Spinner;
