import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
    userId: string;
    items: {
      productId: string;
      quantity: number;
    }[];
};

const CartSchema = new Schema<ICart>({
    userId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
});

export default mongoose.model<ICart>("Cart", CartSchema);
  