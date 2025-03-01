import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import analyticRoutes from "./routes/analytics.routes.js";
import fakeRoutes from "./routes/fake.routes.js";
import govermentRoutes from "./routes/goverment.routes.js";

import cors from "cors";
import prisma from "./utils/prismClient.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173", // Allow frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true ,
};

app.use(cors(corsOptions))

app.use("/auth" , authRoutes);
app.use("/issue" , problemRoutes);
app.use("/analytics" , analyticRoutes);
app.use("/gov" , govermentRoutes);
app.use("/fake" , fakeRoutes);

app.use("/api" , async (req , res) => {
    const lat = "22.596720";
    const lon =  "72.834550";
    const response =await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    const data = await response.json();

    const city = data;
    // console.log(city);
    res.json(city);
})

app.use("/" , async (req , res) => {
  // await prisma.problem.deleteMany({});
  const user = await prisma.problem.findMany({});
  console.log(user);
})

const PORT = process.env.PORT || 3000

app.listen(PORT , () => {
    console.log(`http://localhost:${PORT}`);
})