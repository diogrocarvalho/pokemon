import { Link } from "react-router-dom";
import usePokemonImage from "../../hooks/usePokemonImage";
import TypePill from "../type-pill/TypePill";
import style from "./Pokemon.module.css";

const Pokemon = ({ pokemon }) => {
  const [pokemonImage, isLoading, isError] = usePokemonImage(pokemon.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading image</div>;
  }

  return (
    <div className={style.pokemon}>
      <Link to={`/pokemon/${pokemon.id}`}>
        <img src={pokemonImage} alt={`${pokemon.name}`} />
        <span className={style.number}>
          # {pokemon.id.toString().padStart(3, "0")}
        </span>
        <span className={style.name}>{pokemon.name}</span>
        {pokemon.types.map((type) => {
          return <TypePill key={type.id} type={type} />;
        })}
      </Link>
    </div>
  );
};

export default Pokemon;
