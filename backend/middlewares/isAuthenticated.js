import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return next();

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) return next();

        req.id = decode.userId;
        next();
    } catch (error) {
        next();
    }
};

export default isAuthenticated;
