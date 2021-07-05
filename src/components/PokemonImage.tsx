import styled from "styled-components";
import PokemonColor from "../helpers/PokemonColor";
import pokeballBg from "../assets/images/pokeball-bg.svg";

type ImageProps = {
  primaryColor: string;
  secondaryColor?: string;
  pokeImg: string;
  pokemonImageSize: SizesType;
  onClick?: () => void;
};

type SizesType = {
  width: number;
  height: number;
};

const PokemonImage = (props: ImageProps) => {
  const {
    primaryColor,
    secondaryColor,
    pokeImg,
    pokemonImageSize,
    onClick = () => {},
  } = props;

  if (secondaryColor === undefined) {
    return (
      <PokemonImageContainer
        primaryColor={primaryColor}
        secondaryColor={PokemonColor("unknown")}
        pokemonImageSize={pokemonImageSize}
        backgroundUrl={pokeballBg}
        onClick={onClick}
      >
        <Image src={pokeImg} />
      </PokemonImageContainer>
    );
  }

  return (
    <PokemonImageContainer
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      pokemonImageSize={pokemonImageSize}
      backgroundUrl={pokeballBg}
      onClick={onClick}
    >
      <Image src={pokeImg} />
    </PokemonImageContainer>
  );
};

const PokemonImageContainer = styled.div<
  Pick<ImageProps, "primaryColor" | "secondaryColor" | "pokemonImageSize"> & {
    backgroundUrl: string;
  }
>`
  display: flex;
  height: ${({ pokemonImageSize }) => pokemonImageSize.height}rem;
  width: ${({ pokemonImageSize }) => pokemonImageSize.width}rem;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  margin: 0.5rem;
  background-image: url(${({ backgroundUrl }) => backgroundUrl}),
    linear-gradient(
      130deg,
      ${({ primaryColor }) => primaryColor}90,
      ${({ secondaryColor }) => secondaryColor}90
    );
  background-repeat: no-repeat;
  background-size: 100%;
`;

const Image = styled.img`
  width: 75%;
  -webkit-filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.5));
`;

export default PokemonImage;
