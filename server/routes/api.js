import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ProfileController from "../controllers/ProfileController.js";
import authMiddlware from "../middlewares/Authentication.js";
import { ProductController } from "../controllers/ProductController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Account Signup & Login
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// Profile Operations
router.get("/profile", authMiddlware, ProfileController.index);
router.put("/profile/update/:id", authMiddlware, ProfileController.update);

// Blog API
router.get("/products", ProductController.index);
router.get("/product/random", ProductController.getRandomProducts);
router.get("/banner", ProductController.getBanner);
router.get("/product/:id", ProductController.show);
router.post("/banner/create", authMiddlware, ProductController.createBanner);
router.post("/blog/create", authMiddlware, ProductController.create);
router.put("/blog/update/:id", authMiddlware, ProductController.update);
router.delete("/blog/delete/:id", authMiddlware, ProductController.destroy);

export default router;
