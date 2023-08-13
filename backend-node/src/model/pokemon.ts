import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  types: [{ type: { name: String, url: String } }],
});

const Pokemon = mongoose.model('Pokemon', schema);
export { Pokemon };
