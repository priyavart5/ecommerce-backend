import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();


export const login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials!"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({ message: "Invalid Password!"});
        }

        const token  = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7D" });

        res.status(200).json({ message: "Login successful", token , userId: user.id, userEmail: user.email, userName: user.name });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const register = async ( req, res ) => {

    const errors = validationResult(req.body);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where : { email } });
        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: "user" }, process.env.JWT_SECRET, { expiresIn: "7D" });

        return res.status(200).json({ message: "Register successful", token , userId: user.id, userEmail: user.email });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}