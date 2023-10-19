import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.PRIVATE_KEY;

export const loginValidator = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).json({ message: "You dont have autorization", isLogued: false });
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, secret);

    if (Date.now() >= payload.exp) {
        return res.status(400).json({ message: "Your session has expired", isLogued: false });
    }

    next();
}