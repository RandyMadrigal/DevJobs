import { Users as usersModel } from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.PRIVATE_KEY;

export const Login = async (req, res) => {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hashSync(password, 12);
    
    const user = await usersModel.findOne({
        where: {
            UserEmail: email, UserPassword: encryptedPassword, isActive: true
        }
    });

    if (!user) {
        res.status(400).json({ message: "Wron email or password" });
        return;
    }

    const token = jwt.sign({ user, exp: 86600 }, secret);
    res.status(200).json({ token: token });
}

export const logout = async (req, res) => {
    //TODO: implement logout
}