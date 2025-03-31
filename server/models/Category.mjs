import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, required: true },
  parentCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

export const Category = model("Category", categorySchema);
