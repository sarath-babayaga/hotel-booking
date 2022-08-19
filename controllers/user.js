import Users from "../models/Users.js";

//update User
export const updataUser = async (req, res, next) => {
  const newUsers = new Users(req.body);

  try {
    const saveHUsers = await newUsers.save();
    res.status(200).json(saveHUsers);
  } catch (error) {
    next(error);
  }
};
//delete User
export const deleteUser = async (req, res, next) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been delete !!");
  } catch (error) {
    next(error);
  }
};
//get User
export const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//get all User

export const getAllUser = async (req, res, next) => {
  const failed = true;
  if (failed) return next(createError(404, "You are not authenticated"));

  try {
    const Users = await Users.find();
    res.status(200).json(Users);
  } catch (error) {
    next(error);
  }
};
