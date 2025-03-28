import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        
        const product = await Product.findById({ productId });
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });
        if(!cart){
            cart = new Cart({ userId, items:[ productId, quantity ] });
        } else {
            const itemIndex = cart.items.findIndex((items) => items.productId === productId);
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();

        res.status(200).json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const removeFromCart = async (req, res) => {

    const { productId } = req.body;
    const userId = req.user.id;

    try {
        const cart = await Cart.findById({ userId });
        if(!cart){
            return res.status(404).json({ message: "Cart not found" });
        }
    
        cart.items = cart.items.filter((items) => items.productId === productId);
        await cart.save();

        res.status(200).json({ message: "Item removed from cart", cart });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};