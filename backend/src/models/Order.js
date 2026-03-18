import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    items: [
      {
        menuItemId: mongoose.Schema.Types.ObjectId,
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
    customer: {
      name: String,
      address: String,
      phone: String,
    },
    totalAmount: Number,
    status: {
      type: String,
      default: "Order Received",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
