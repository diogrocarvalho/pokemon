const fetchPokemonList = async ({ queryKey }) => {
  const { name, type } = queryKey[1];

  const url = `http://localhost:5000/pokemon?name=${name}&type=${type}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`check params and try again`);
  }

  return (await response.json()) || [];
};

export default fetchPokemonList;
