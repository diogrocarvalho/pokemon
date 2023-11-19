import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  types: [{ type: { name: String, url: String, id: Number } }],
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' }, // Reference to the Image model
});

const Pokemon = mongoose.model('Pokemon', schema);
export { Pokemon };
