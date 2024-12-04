import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products_array: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      variantId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  billing_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip_code: { type: String, required: true },
    country: { type: String, required: true },
  },
  shipping_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zip_code: { type: String, required: true },
    country: { type: String, required: true },
  },
  total_cost: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Přidání middleware pro aktualizaci `updatedAt`
orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
