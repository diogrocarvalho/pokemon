const fetchPokemonTypes = async () => {
  const response = await fetch(`http://localhost:5000/type`);

  if (!response.ok) {
    throw new Error(`pokemon types fetch not ok`);
  }

  return await response.json();
};

export default fetchPokemonTypes;
