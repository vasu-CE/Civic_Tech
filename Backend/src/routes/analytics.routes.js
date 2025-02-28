import express from "express"
import isAuthenticated from "../middlewares/Authentication.js";
import { leaderBoard } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/leaderboard" , isAuthenticated , leaderBoard);

export default router