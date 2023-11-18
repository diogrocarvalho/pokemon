const fetchPokemonImage = async ({ queryKey }) => {
  const id = queryKey[1];
  const response = await fetch(`http://localhost:5000/pokemon/image/${id}`);

  if (!response.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  const pokemonImage = await response.arrayBuffer();
  const blob = new Blob([pokemonImage], { type: "image/png" });
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
};

export default fetchPokemonImage;
