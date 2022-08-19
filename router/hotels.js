import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getHotel,
  updatHotel
} from "../controllers/hotels.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// sadece adminin izni olan islemler
//create
router.post("/", verifyAdmin, createHotel);

//update
router.put("/:id", verifyAdmin, updatHotel);

//delete
router.delete("/:id", verifyAdmin, deleteHotel);

// herkese acik olan islemler
//get
router.get("/:id", getHotel);

//get all
router.get("/", getAllHotel);

export default router;
