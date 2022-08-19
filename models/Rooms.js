import mongoose from "mongoose";

const RoomsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    maxPeople: {
      type: Number,
      required: false
    },
    minPeople: {
      type: Number,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    roomNumber: [{ number: Number, unavailableDates: { type: [Date] } }]
  },
  { timestamps: true }
);

// [
//   {number:101,unavailableDates:[01,05,2020,02,05,2020]}
// ]

export default mongoose.model("Rooms", RoomsSchema);
