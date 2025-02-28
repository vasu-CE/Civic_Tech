import express from "express"
import isAuthenticated from "../middlewares/Authentication.js";
import { getAnalyticsData, getIssueCategories, getLastMonthData, getRecentActivity, getWeeklyData, leaderBoard } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/leaderboard" , isAuthenticated , leaderBoard);
router.get("/", isAuthenticated , getAnalyticsData);
router.get("/weekly", isAuthenticated , getWeeklyData);
router.get("/monthly", isAuthenticated , getLastMonthData);
router.get("/categories", isAuthenticated , getIssueCategories);
router.get("/recent-activity", isAuthenticated , getRecentActivity);


export default router