import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// routers
import authRouter from "./router/auth.js";
import usersRouter from "./router/user.js";
import hotelsRouter from "./router/hotels.js";
import roomsRouter from "./router/rooms.js";

//cookie parser
import cookieparser from "cookie-parser";

// config .env
dotenv.config();

//config express
const app = express();

// connect to mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connect succeses");
  } catch (error) {
    throw error;
  }
};

// DB dissconnected
mongoose.connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

//DB connected
mongoose.connection.on("connected", () => {
  console.log("DB is connected");
});

// middlewares
app.use(cookieparser());
app.use(express.json());

//router
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

// Error controller
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Someting went wring!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage
    //stack: err.stack
  });
});

// runing server for 4400 port/api
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server is runing ${process.env.PORT}`);
});
