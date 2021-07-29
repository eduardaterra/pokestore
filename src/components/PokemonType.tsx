import styled from "styled-components";

type PokemonTypeColor = {
  pokemonColor: string;
  pokemonType: string;
  fontSize: number;
  backgroundSize: { height: number; width: number };
};

const PokemonType = (props: PokemonTypeColor) => {
  const { pokemonColor, pokemonType, fontSize, backgroundSize } = props;
  return (
    <PokemonTypeCard
      pokemonColor={pokemonColor}
      fontSize={fontSize}
      backgroundSize={backgroundSize}
    >
      <p>{pokemonType.toUpperCase()}</p>
    </PokemonTypeCard>
  );
};
const PokemonTypeCard = styled.div<
  Pick<PokemonTypeColor, "pokemonColor" | "fontSize" | "backgroundSize">
>`
  display: flex;
  width: ${({ backgroundSize }) => backgroundSize.width}rem;
  height: ${({ backgroundSize }) => backgroundSize.height}rem;
  border-radius: 30px;
  box-shadow: inset 0px 0px 1px 2px rgba(255, 255, 255, 0.8);
  border: 1px solid var(--black);
  align-items: center;
  justify-content: center;
  background-color: ${({ pokemonColor }) => pokemonColor};
  > p {
    font-size: ${({ fontSize }) => fontSize}rem;
    color: var(--white);
    width: fit-content;
    text-shadow: 1px 1px 2px var(--black);
  }
  @media (max-width: 1000px) {
    width: ${({ backgroundSize }) => backgroundSize.width - 0.8}rem;
    height: ${({ backgroundSize }) => backgroundSize.height - 0.3}rem;
    > p {
      font-size: ${({ fontSize }) => fontSize - 0.1}rem;
    }
  }
`;

export default PokemonType;
