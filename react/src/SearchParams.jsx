import { useEffect, useState } from "react";

const SearchParams = () => {
  const [name, setName] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedPokemonType, setSelectedPokemonType] = useState("");

  useEffect(() => {
    const getTypes = async () => {
      const response = await fetch("http://localhost:5000/type");
      const types = await response.json();
      setPokemonTypes(types);
    };
    getTypes();
  }, []);

  function onChangeSelectedPokemonType(value) {
    console.log("see", value);
    setSelectedPokemonType(value);
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("hahah", selectedPokemonType);
  }

  return (
    <div className="search-params">
      <form onSubmit={onSubmit}>
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
          {pokemonTypes.map((type) => (
            <option key={type._id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
