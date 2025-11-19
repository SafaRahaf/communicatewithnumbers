import { Router } from "express";
import {
  getTree,
  startNumber,
  respondTo,
} from "../controllers/calc.controllers";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/tree", getTree);
router.post("/start", authMiddleware, startNumber);
router.post("/respond/:parentId", authMiddleware, respondTo);

export default router;
