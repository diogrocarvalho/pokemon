import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
});

const PokemonType = mongoose.model('PokemonType', schema);
export { PokemonType };
