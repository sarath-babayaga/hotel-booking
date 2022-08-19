import Hotels from "../models/Hotels.js";

// create hotel
export const createHotel = async (req, res, next) => {
  const newHotels = new Hotels(req.body);

  try {
    const saveHhotels = await newHotels.save();
    res.status(200).json(saveHhotels);
  } catch (error) {
    next(error);
  }
};

//update hotel
export const updatHotel = async (req, res, next) => {
  try {
    const updatHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatHotel);
  } catch (error) {
    next(error);
  }
};
//delete hotel
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been delete !!");
  } catch (error) {
    next(error);
  }
};
//get hotel
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//get all hotel

export const getAllHotel = async (req, res, next) => {
  const failed = true;
  if (failed) return next(createError(404, "You are not authenticated"));

  try {
    const hotels = await Hotels.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
