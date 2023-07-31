import { useState } from "react";

const POKEMON_TYPES = ["FIRE", "WATER", "GRASS", "ELECTRIC"];
const SearchParams = () => {
  const [name, setName] = useState("");
  const [selectedPokemonType, setSelectedPokemonType] = useState("");

  function onChangeSelectedPokemonType(value) {
    setSelectedPokemonType(value || "");
  }

  return (
    <div className="search-params">
      <form>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="pokemonType">Type</label>
        <select
          id="pokemonTypeList"
          value={selectedPokemonType}
          placeholder="Select a pokemon type"
          onChange={(e) => onChangeSelectedPokemonType(e.target.value)}
        >
          <option>Select a pokemon type</option>
          {POKEMON_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
