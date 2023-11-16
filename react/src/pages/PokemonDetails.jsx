import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Pokemon from "../components/pokemon/Pokemon";
import fetchPokemon from "../queries/fetchPokemon";

const PokemonDetails = () => {
  const { id } = useParams();
  const results = useQuery(["pokemonDetails", id], fetchPokemon);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌊</h2>
      </div>
    );
  }
  const pokemon = results.data[0];
  return <Pokemon pokemon={pokemon}></Pokemon>;
};

export default PokemonDetails;
