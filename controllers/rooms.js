import Rooms from "../models/Rooms.js";
import Hotels from "../models/Hotels.js";

// create room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);

  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id }
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(saveRoom);
  } catch (error) {
    next(error);
  }
};

//update Room
export const updataRoom = async (req, res, next) => {
  try {
    const updataRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updataRoom);
  } catch (error) {
    next(error);
  }
};

//delete Room
export const deleteRoom = async (req, res, next) => {
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    res.status(200).json("Room has been delete !!");
  } catch (error) {
    next(error);
  }
};
//get room
export const getRoom = async (req, res, next) => {
  try {
    const room = await Rooms.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//get all room

export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
