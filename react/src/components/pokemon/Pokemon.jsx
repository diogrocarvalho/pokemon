import { Link } from "react-router-dom";
import TypePill from "../type-pill/TypePill";
import style from "./Pokemon.module.css";

const Pokemon = ({ pokemon }) => {
  return (
    <div className={style.pokemon}>
      <Link to={`/pokemon/${pokemon.id}`}>
        <span>{pokemon.id}</span>
        <span>{pokemon.name}</span>
        {pokemon.types.map((type) => {
          return <TypePill key={type.id} type={type} />;
        })}
      </Link>
    </div>
  );
};

export default Pokemon;
