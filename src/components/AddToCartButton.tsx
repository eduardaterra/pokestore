import styled from "styled-components";

import Cart from "../assets/images/cart.svg";

type AddToCartType = {
  fontSize: number;
  iconSize: number;
  backgroundSize: {
    height: number;
    width: number;
  };
  onClick: () => void;
};

const AddToCartButton = (props: AddToCartType) => {
  const { fontSize, iconSize, backgroundSize, onClick = () => {} } = props;

  return (
    <AddToCartContainer
      onClick={onClick}
      backgroundSize={backgroundSize}
      fontSize={fontSize}
    >
      <IconSize src={Cart} alt="cart" iconSize={iconSize} /> add to cart
    </AddToCartContainer>
  );
};

const AddToCartContainer = styled.div<
  Pick<AddToCartType, "backgroundSize" | "fontSize">
>`
  display: flex;
  flex-direction: row;
  background-color: var(--red);
  border-radius: 1rem;
  color: var(--white);
  width: ${({ backgroundSize }) => backgroundSize.width}rem;
  height: ${({ backgroundSize }) => backgroundSize.height}rem;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize}rem;

  @media (max-width: 800px) {
    width: ${({ backgroundSize }) => backgroundSize.width - 2.2}rem;
    height: ${({ backgroundSize }) => backgroundSize.height - 0.3}rem;
    font-size: ${({ fontSize }) => fontSize - 0.2}rem;
  }
`;

const IconSize = styled.img<Pick<AddToCartType, "iconSize">>`
  width: ${({ iconSize }) => iconSize}rem;
  @media (max-width: 800px) {
    width: ${({ iconSize }) => iconSize - 0.2}rem;
  }
`;

export default AddToCartButton;
