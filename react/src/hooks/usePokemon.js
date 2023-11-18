import { useQuery } from "@tanstack/react-query";
import fetchPokemon from "../queries/fetchPokemon";

export default function usePokemon(id) {
  const results = useQuery(["pokemonDetails", id], fetchPokemon);
  return [results.data, results.isLoading, results.isError];
}
