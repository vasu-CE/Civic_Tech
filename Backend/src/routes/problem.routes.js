import express from "express"
import isAuthenticated from "../middlewares/Authentication.js";
import { checkUserVote, deleteProblem, getAllProblems, rateProblem, uploadProblem, voting } from "../controllers/problem.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post('/upload-problem' , isAuthenticated , upload.single("image") , uploadProblem);
router.get('/all-problem' , isAuthenticated , getAllProblems);
router.post('/voting/:id' , isAuthenticated , voting);
router.get('/check/:id' ,isAuthenticated , checkUserVote)
router.post('/rate/:id' , isAuthenticated , rateProblem);
router.delete('/delete/:problemId' , isAuthenticated , deleteProblem);

export default router