import express from "express"
import { acceptProblem, approveProblem, rejectProblem } from "../controllers/goverment.controller.js";
import { isGovernment } from "../utils/helper.js";
import isAuthenticated from "../middlewares/Authentication.js";

const router = express.Router();

router.post("/approve/:problemId",isAuthenticated ,  isGovernment, approveProblem);
router.post("/reject/:problemId", isAuthenticated , isGovernment, rejectProblem);
router.post("/complete/:problemId", isAuthenticated , isGovernment, acceptProblem);

export default router