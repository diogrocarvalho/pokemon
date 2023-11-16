import { useEffect, useState } from "react";
import usePokemonTypes from "../hooks/usePokemonTypes";
import PokemonList from "./pokemon/PokemonList";

const SearchParams = () => {
  const [name, setName] = useState("");
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonTypes] = usePokemonTypes();

  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch("http://localhost:5000/pokemon");
      const pokemon = await response.json();
      setPokemonList(pokemon);
    };
    getPokemon();
  }, []);

  /* USED TO CREATE THE 151 FIRST POKEMON ON DB GETTING IT FROM REMOTE IF THEY DON'T EXIST
  useEffect(() => {
    const createPokemon = async () => {
      console.log("creating pokemon 1-151");
      for (let i = 1; i <= 151; i++) {
        await fetch("http://localhost:5000/pokemon/" + i);
      }
    };
    createPokemon();
  }, []);
  */

  const getPokemon = async () => {
    const response = await fetch(
      `http://localhost:5000/pokemon?name=${name}&type=${selectedPokemonType}`
    );
    const pokemon = await response.json();
    setPokemonList(pokemon);
  };

  function onChangeSelectedPokemonType(value) {
    setSelectedPokemonType(value);
  }

  function onSubmit(e) {
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="search-params">
      <form onSubmit={onSubmit}>
        <span className="input">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </span>
        <span className="input">
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
        </span>

        <button className="btn-submit">Submit</button>
      </form>

      <PokemonList pokemonList={pokemonList}></PokemonList>
    </div>
  );
};

export default SearchParams;
