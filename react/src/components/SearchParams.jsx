import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import usePokemonTypes from "../hooks/usePokemonTypes";
import fetchPokemonList from "../queries/fetchPokemonList";
import styles from "./SearchParams.module.css";
import PokemonList from "./pokemon/PokemonList";
import TypePill from "./type-pill/TypePill";

const SearchParams = () => {
  const [name, setName] = useState("");
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const [pokemonTypes] = usePokemonTypes();
  const [debouncedName] = useDebounce(name, 300);
  const [debouncedType] = useDebounce(selectedPokemonType, 300);
  const {
    isLoading,
    isError,
    data: pokemonList,
  } = useQuery(
    [`pokemonList`, { name: debouncedName, type: debouncedType }],
    fetchPokemonList
  );

  const onChangeSelectedPokemonType = (type) => {
    setSelectedPokemonType(type.id);
  };

  return (
    <div className="search-params">
      <form onSubmit={(e) => e.preventDefault()}>
        <span className="input">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </span>

        <div className={styles.types}>
          {pokemonTypes.map((type) => (
            <TypePill
              selectedType={debouncedType}
              key={type.id}
              type={type}
              onClick={onChangeSelectedPokemonType}
            />
          ))}
        </div>
      </form>
      {isLoading ?? <h2>Carregando...</h2>}
      {isError ?? <h2>Error...</h2>}
      <PokemonList
        selectedType={debouncedType}
        pokemonList={pokemonList}
      ></PokemonList>
    </div>
  );
};

export default SearchParams;
