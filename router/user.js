import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  updataUser
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("halle user, you are logged in !!");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user you are logged in and you can delete you accound");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello user you are logged in and you can delete all accound");
// });

//create
router.post("/", (req, res) => {
  res.send("hotel create");
});

//update
router.put("/:id", verifyUser, updataUser);
//delete
router.delete("/:id", verifyUser, deleteUser);
//get
router.post("/:id", verifyUser, getUser);

//get all  bunu sadece admin kontroller edebilir
router.post("/", verifyAdmin, getAllUser);

export default router;
