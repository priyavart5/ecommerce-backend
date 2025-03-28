import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true 
        },
        description: { 
            type: String, 
            equired: true 
        },
        price: { 
            type: Number, 
            required: true, 
            min: 0 
        },
        category: { 
            type: String, 
            required: true 
        },
        stock: { 
            type: Number, 
            required: true, 
            min: 0 
        },
        images: [{ type: String }],
        createdBy: { 
            type: String, 
            ref: "User", 
            required: true 
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
