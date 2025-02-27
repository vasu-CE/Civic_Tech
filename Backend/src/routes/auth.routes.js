import express from "express"
import { loginUser, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup' , signup);

export default router