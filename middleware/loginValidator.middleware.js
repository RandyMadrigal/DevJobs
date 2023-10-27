import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.PRIVATE_KEY;

export const loginValidator = (req, res, next) => {
    const token = req.cokies.token;
    try {
        const user = jwt.verify(token, secret);
        req.user = user;
        next();
    } catch (error) {
        res.cleanCookie("token");

        // TODO: redirect to login page when we have a frontend
        // res.redirect("/login");
        return res.status(400).json({ message: "You dont have autorization", isLogued: false });
    }
}