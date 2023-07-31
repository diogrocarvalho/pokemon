const Pokemon = (props) => {
  return (
    <div>
      <h1>{props.number}</h1>
      <h2>{props.name}</h2>
      <h2>{props.type}</h2>
    </div>
  );
};

export default Pokemon;
