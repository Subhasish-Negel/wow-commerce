import express from "express";
import "dotenv/config";
import ApiRoutes from "./routes/api.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { speedLimiter } from "./config/spamLimiter.js";
import logger from "./config/logger.js";
const app = express();
const PORT = process.env.PORT || 8000;

// Middileware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public/images"));
app.use(fileUpload());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(helmet.hsts());
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.disable("x-powered-by");
// app.use(speedLimiter);

app.use(
  cors({
    // origin: "http://localhost:3030",
    // origin: "https://wow-commerce.vercel.app",
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ First_Message: "Yoo! Server is Running Smooth aF" });
});

app.use("/api", ApiRoutes);

// logger
logger.info("Hey I am just testing fr fr");

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
