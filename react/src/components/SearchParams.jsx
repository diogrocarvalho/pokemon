import { useEffect, useState } from "react";
import Pokemon from "./pokemon/Pokemon";

const SearchParams = () => {
  const [name, setName] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const getTypes = async () => {
      const response = await fetch("http://localhost:5000/type");
      const types = await response.json();
      setPokemonTypes(types);
    };
    getTypes();
  }, []);

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch("http://localhost:5000/pokemon");
      const pokemon = await response.json();
      setPokemonList(pokemon);
    };
    getPokemon();
  }, []);

  const getPokemon = async () => {
    const response = await fetch(
      `http://localhost:5000/pokemon?name=${name}&type=${selectedPokemonType}`
    );
    const pokemon = await response.json();
    setPokemonList(pokemon);
  };

  function onChangeSelectedPokemonType(value) {
    console.log("see", value);
    setSelectedPokemonType(value);
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("hahah", selectedPokemonType);
    getPokemon();
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

      {pokemonList.map((pokemon) => {
        console.log(pokemon);
        return <Pokemon key={pokemon.id} props={pokemon} />;
      })}
    </div>
  );
};

export default SearchParams;
