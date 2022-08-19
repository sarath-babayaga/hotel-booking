import jwt from "jsonwebtoken";
import { createError } from "./Error.js";
// token esletirme
export const verifyToken = (req, res, next) => {
  const token = req.cookies.acces_token;
  if (!token) {
    return createError(401, "You are not auth");
  }

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) return next(createError(403, "token is not valid !"));
    req.user = user;
    next();
  });
};
// token ile userID kontroll
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // token ve user den gelen id'yi kontrol ediyoruz,ayrica isAdmin da beraber kontrol ediyoruz
    if (req.user.id === req.params.id || req.user.isAmin) {
      next();
    } else {
      if (error) return next(createError(403, "You are not auth"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "you are not auht"));
    }
  });
};
