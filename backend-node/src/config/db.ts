import mongoose from 'mongoose';
async function connectDB() {
  const conn = await mongoose.connect(process.env.MONGO_LOCALHOST_URI!, {
    dbName: 'pokemon',
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
  });
  console.log('MongoDb Connected');
}
export default connectDB;
