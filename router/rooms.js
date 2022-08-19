import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoom,
  updataRoom
} from "../controllers/rooms.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// sadece adminin izni olan islemler
//create
router.post("/:hotelid", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updataRoom);

//delete
router.delete("/:id", verifyAdmin, deleteRoom);

// herkese acik olan islemler
//get
router.get("/:id", getRoom);

//get all
router.get("/", getAllRooms);

export default router;
