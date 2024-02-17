import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ProfileController from "../controllers/ProfileController.js";
import authMiddlware from "../middlewares/Authentication.js";
import { BlogController } from "../controllers/BlogController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Account Signup & Login
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// Profile Operations
router.get("/profile", authMiddlware, ProfileController.index); 
router.put("/profile/update/:id", authMiddlware, ProfileController.update);

// Blog API
router.get("/blog", BlogController.index);
router.post("/blog/create", authMiddlware, BlogController.create);
router.get("/blog/:id", BlogController.show);
router.put("/blog/update/:id", authMiddlware, BlogController.update);
router.delete("/blog/delete/:id", authMiddlware, BlogController.destroy);

export default router;
