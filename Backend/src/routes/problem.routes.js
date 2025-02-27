import express from "express"
import isAuthenticated from "../middlewares/Authentication.js";
import { getAllProblems, uploadProblem } from "../controllers/problem.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post('/upload-problem' , isAuthenticated , upload.single("image") , uploadProblem);
router.get('/all-problem' , isAuthenticated , getAllProblems);

export default router