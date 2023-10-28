const Pokemon = ({ props: pokemon }) => {
  return (
    <div>
      <span>{pokemon.id}</span>
      <span>{pokemon.name}</span>
      <span>
        {pokemon.types.map((type) => {
          return (
            <span style={{ marginRight: "5px" }} key={type.id}>
              {type.name}
            </span>
          );
        })}
      </span>
    </div>
  );
};

export default Pokemon;
