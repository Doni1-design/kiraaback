import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authroute from "./routes/auth.js"
import usersroute from "./routes/users.js"
import orderroute from "./routes/Order.js"
import hotelsroute from "./routes/hotels.js"
import roomsroute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';


const _filename = fileURLToPath(import.meta.url)

const _dirname = path. dirname (_filename)

console. log(_dirname);



const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connecté a mongodb!")
  } catch (error) {
    throw error;
  }
};
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET, POST, PUT, DELETE',
};





app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authroute)
app.use("/api/hotels",hotelsroute)
app.use("/api/rooms",roomsroute)
app.use("/api/users",usersroute)
app.use("/api/orders",orderroute)


app.use(express.static(path.join(_dirname, '/client/build')))
// Render client for any path
app.get("*",(req, res) => res.sendFile(path.join(_dirname, "/client/build/index.html")));

app.listen(8000, () => {
  connect();
  console.log("connecté au serveur");
});
