import { Router } from "express";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { AuthController } from "../controllers/authController";

const router = Router();
const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/protected",
  authMiddleware.authenticateToken,
  authController.protectedRoute,
);

export default router;
