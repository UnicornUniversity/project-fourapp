import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  parentCategoryId: { type: Number, default: null },
});

export const Category = model("Category", categorySchema);
