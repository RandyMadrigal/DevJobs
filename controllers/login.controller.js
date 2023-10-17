import { Users as usersModel } from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.PRIVATE_KEY;

export const Login = async (req, res) => {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hashSync(password, 12);

    // find user where email and password match and user is active
    
    const user = await usersModel.findOne({
        where: {
            UserEmail: email, UserPassword: encryptedPassword, isActive: true
        }
    });

    console.log(user);
    if (!user) {
        res.status(400).json({ message: "Wron email or password" });
        return;
    }

    const token = jwt.sign({ user, exp: 86600 }, secret);
    res.status(200).json({ token: token });
}

export const Signup = async (req, res) => {
    res.send("Signup");
}