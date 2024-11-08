import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import * as someController from "../controllers/authController";

const router = Router();
router.get("/protected", authenticateToken, someController.protectedRoute);

export default router;
