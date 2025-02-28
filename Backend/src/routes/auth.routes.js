import express from "express"
import { getProfile, loginUser, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup' , signup);
router.get('/get-profile/:userId' , getProfile);

export default router