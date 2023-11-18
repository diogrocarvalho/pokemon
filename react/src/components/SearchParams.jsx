import { useEffect, useState } from "react";
import usePokemonTypes from "../hooks/usePokemonTypes";
import styles from "./SearchParams.module.css";
import PokemonList from "./pokemon/PokemonList";
import TypePill from "./type-pill/TypePill";

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

  const onChangeSelectedPokemonType = (type) => {
    setSelectedPokemonType(type.id);
  };

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

        <div className={styles.types}>
          {pokemonTypes.map((type) => (
            <TypePill
              key={type.id}
              type={type}
              onClick={onChangeSelectedPokemonType}
            />
          ))}
        </div>
      </form>

      <PokemonList pokemonList={pokemonList}></PokemonList>
    </div>
  );
};

export default SearchParams;
