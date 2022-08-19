import bcrypt from "bcryptjs";
import Users from "../models/Users.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/Error.js";
export const register = async (req, res, next) => {
  try {
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hash
    });
    await newUser.save();
    res.status(200).send("User has been creaded!");
  } catch (error) {
    next(error);
  }
};

//login

export const login = async (req, res, next) => {
  try {
    //hash password
    const user = await Users.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found !!"));
    // password correct
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong passowrd or username"));

    //json web token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("acces_token", token, {
        httpOnly: true
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
