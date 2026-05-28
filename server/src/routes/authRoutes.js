import express from "express";

import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();


// REGISTER
router.post("/register", registerAdmin);


// LOGIN
router.post("/login", loginAdmin);


// LOGOUT
router.post("/logout", logoutAdmin);


// CURRENT ADMIN
router.get("/me", authMiddleware, getCurrentAdmin);

export default router;