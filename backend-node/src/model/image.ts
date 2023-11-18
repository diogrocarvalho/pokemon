import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  pokemonNumber: String,
});
const Image = mongoose.model('PokemonImage', imageSchema);

export { Image };
