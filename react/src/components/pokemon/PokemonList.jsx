import Pokemon from "./Pokemon";

const PokemonList = ({ pokemonList }) => {
  return (
    <div className="pokemon-list">
      {!pokemonList?.length ? (
        <h1>No Pokemon found!</h1>
      ) : (
        pokemonList.map((pokemon) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))
      )}
    </div>
  );
};

export default PokemonList;
