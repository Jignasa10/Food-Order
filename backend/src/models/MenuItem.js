import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});

export default mongoose.model("MenuItem", menuSchema);
