import { Link } from "react-router-dom";

const Pokemon = ({ pokemon }) => {
  return (
    <div className="pokemon">
      <Link to={`/pokemon/${pokemon.id}`}>
        <span>{pokemon.id}</span>
        <span>{pokemon.name}</span>
        <span>
          {pokemon.types.map((type) => {
            return <span key={type.id}>{type.name}</span>;
          })}
        </span>
      </Link>
    </div>
  );
};

export default Pokemon;
