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
import geoip from "geoip-lite";

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

app.get("/api/ip-info", (req, res) => {
  const clientIpHeader = req.headers["x-forwarded-for"];
  let clientIp;

  if (clientIpHeader) {
    // Split the x-forwarded-for header and use the first IP address
    clientIp = clientIpHeader.split(",")[0].trim();
  } else {
    // Fall back to using the connection's remote address
    clientIp = req.socket.remoteAddress;
  }

  // // Extract the IPv4 address if the client IP is an IPv4-mapped IPv6 address
  // const ipv4 = clientIp.includes("::ffff:")
  //   ? clientIp.split("::ffff:")[1]
  //   : clientIp;

  // console.log(ipv4);
  // const geoData = geoip.lookup(ipv4);

  // const ipInfo = {
  //   ipAddress: ipv4,
  //   city: geoData?.city || "Unknown",
  //   country: geoData?.country || "Unknown",
  // };

  res.status(200).json(ipInfo);
});

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


app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
