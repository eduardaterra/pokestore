import styled from "styled-components";
import PokemonColor, { A } from "../helpers/PokemonColor";

type PokemonBgColor = { pokeTypes: string[]; pokeImg: string };

type BgProps = {
  primaryColor: string;
  secondaryColor?: string;
  pokeImg: string;
};

const PokemonImage = (props: PokemonBgColor) => {
  const primaryColor = PokemonColor(props.pokeTypes[0] as A);
  const secondaryColor = PokemonColor(props.pokeTypes[1] as A);
  const { pokeImg } = props;

  if (secondaryColor === undefined) {
    return (
      <Background
        primaryColor={primaryColor}
        secondaryColor={PokemonColor("unknown")}
        pokeImg={pokeImg}
      ></Background>
    );
  }

  return (
    <Background
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      pokeImg={pokeImg}
    ></Background>
  );
};

const Background = (props: BgProps) => {
  const { primaryColor } = props;
  const { secondaryColor } = props;
  const { pokeImg } = props;

  return (
    <BackgroundPokemon
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    >
      <Image src={pokeImg} />
    </BackgroundPokemon>
  );
};

const BackgroundPokemon = styled.div<
  Pick<BgProps, "primaryColor" | "secondaryColor">
>`
  height: 8rem;
  width: 8rem;
  border-radius: 5rem;
  background: linear-gradient(
    130deg,
    ${({ primaryColor }) => primaryColor},
    ${({ secondaryColor }) => secondaryColor}
  );
`;

const Image = styled.img`
  width: 6rem;
  margin: 1rem;
`;

export default PokemonImage;
