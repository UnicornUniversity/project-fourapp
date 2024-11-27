import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String },
  email: { 
    type: String, 
    required: function () { 
      return this.isNew;
    }, 
    unique: true 
  },
  password: { type: String },
  google_id: { type: String },
  phone_number: { type: String },
  role: { type: String, default: "Customer" },
  billing_address: {
    billing_street_address: { type: String },
    billing_city: { type: String },
    billing_zip_code: { type: String },
    billing_country: { type: String },
  },
  shipping_address: {
    shipping_street_address: { type: String },
    shipping_city: { type: String },
    shipping_zip_code: { type: String },
    shipping_country: { type: String },
  },
  cart_array: [
    {
      id: { type: String },
      variantId: { type: String },
      quantity: { type: Number },
    },
  ],
  wishlist_array: [
    {
      id: { type: String },
      variantId: { type: String },
    },
  ],
});

userSchema.set("runValidators", true);

export default model("User", userSchema);
