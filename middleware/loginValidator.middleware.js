
export const loginValidator = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, secret);

    if (Date.now() >= payload.exp) {
        return res.status(400).json({ message: "Missing email or password" });
    }

    next();
}