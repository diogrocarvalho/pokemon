import React from "react";
import { useParams } from "react-router-dom";
import Pokemon from "../components/pokemon/Pokemon";
import usePokemon from "../hooks/usePokemon";

const PokemonDetails = () => {
  const { id } = useParams();
  const [data, isLoading, isError] = usePokemon(id);

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌊</h2>
      </div>
    );
  }

  if (isError) {
    <h2>No pokemon found with id {id}</h2>;
  }
  const pokemon = data[0];
  return <Pokemon pokemon={pokemon}></Pokemon>;
};

export default PokemonDetails;
