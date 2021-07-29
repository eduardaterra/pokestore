import { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Snorlax from "../assets/images/snorlax.svg";

const NotFound = () => {
  const [isLoading, setIsLoading] = useState(true);

  const img = new Image();
  img.onload = () => {
    setIsLoading(false);
  };
  img.src = Snorlax;

  return isLoading ? null : (
    <PageNotFoundContainer>
      <img src={Snorlax} alt="snorlax" />
      <p>{`error 404: page not found :(`}</p>
      <Link to="/">go to the home</Link>
    </PageNotFoundContainer>
  );
};
const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 8rem;

  gap: 1rem;

  > img {
    width: 16rem;
    opacity: 0.6;
    margin-bottom: 0.5rem;
  }
  > p {
    font-size: 1rem;
    color: var(--gray);
    text-align: center;
    line-height: 1rem;
  }

  > a {
    color: var(--light-gray);
    font-size: 0.8rem;
  }
  @media (max-width: 600px) {
    margin-top: 6.6rem;
    > img {
      width: 14rem;
    }
    > p {
      font-size: 0.6rem;
    }
    > a {
      font-size: 0.55rem;
    }
  }
`;

export default NotFound;
