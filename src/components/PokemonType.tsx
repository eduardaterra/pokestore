import styled from "styled-components";

type PokemonTypeColor = {
  pokemonColor: string;
  pokemonType: string;
};

const PokemonType = (props: PokemonTypeColor) => {
  const { pokemonColor } = props;
  const { pokemonType } = props;
  return (
    <PokemonTypeCard pokemonColor={pokemonColor}>
      <h1>{pokemonType.toUpperCase()}</h1>
    </PokemonTypeCard>
  );
};
const PokemonTypeCard = styled.div<Pick<PokemonTypeColor, "pokemonColor">>`
  display: flex;
  width: 4rem;
  height: 1.3rem;
  border-radius: 30px;
  box-shadow: inset 0px 0px 1px 2px rgba(255, 255, 255, 0.8);
  border: 1px solid var(--black);
  align-items: center;
  justify-content: center;
  background-color: ${({ pokemonColor }) => pokemonColor};
  > h1 {
    font-size: 0.5rem;
    color: var(--white);
    width: fit-content;
    text-shadow: 1px 1px 2px var(--black);
  }
`;

export default PokemonType;
