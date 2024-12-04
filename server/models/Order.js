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
  //Je potřeba při testování mít Billing adress a Shipping adress na flase jinak je nefunkční
  billing_address: {
    street: { type: String, required: false},
    city: { type: String, required: false },
    zip_code: { type: String, required: false },
    country: { type: String, required: false },
  },
  shipping_address: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    zip_code: { type: String, required: false },
    country: { type: String, required: false },
  },
  total_cost: { type: Number, required: false },
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
