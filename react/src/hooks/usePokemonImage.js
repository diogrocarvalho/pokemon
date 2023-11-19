import { useQuery } from "@tanstack/react-query";
import fetchPokemonImage from "../queries/fetchPokemonImage";

export default function usePokemonImage(id) {
  const results = useQuery(["pokemonImage", id], fetchPokemonImage);
  return [results.data, results.isLoading, results.isError];
}
