const fetchPokemon = async ({ queryKey }) => {
  const id = queryKey[1];
  const response = await fetch(`http://localhost:5000/pokemon/${id}`);

  if (!response.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return await response.json();
};

export default fetchPokemon;
