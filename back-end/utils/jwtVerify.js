import "dotenv/config";
import jwt from "jsonwebtoken";

const { JWT_SECRET_KEY } = process.env;

export const JWTVerify = (req) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {
      if (error) {
        console.error(error);
        throw error;
      }

      return userInfo;
    });

    res.status(500).json(error);
  } else {
    return null;
  }
};
