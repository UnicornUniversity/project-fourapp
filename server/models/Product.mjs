import { Schema, model } from "mongoose";

const variantSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  size: { type: String, required: false },
  color: { type: String, required: false },
  stock: { type: Number, required: true },
  images: { type: [String], required: false },
});

const productSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  isOnline: { type: Boolean, required: true },
  variants: { type: [variantSchema], required: true },
  categories: {
    type: [Schema.Types.ObjectId],
    ref: "Category",
    required: false,
  },
});

productSchema.index({ name: "text", description: "text" });

export const Product = model("Product", productSchema);
