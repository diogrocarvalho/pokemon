import { useQuery } from "@tanstack/react-query";
import fetchPokemonTypes from "../queries/fetchPokemonTypes";

export default function usePokemonTypes() {
  const results = useQuery(["pokemonTypes"], fetchPokemonTypes);
  return [results?.data ?? [], results.status];
}
