import authRoutes from "./auth.rotue";
import calcRoutes from "./calc.route";
import { Router } from "express";

const router = Router();

router.use("/auth", authRoutes);
router.use("/calc", calcRoutes);

export default router;

// 1: cunnect db & server
// 2: create register & login system with eser & password
// 3: start convertation with number e.g.{number: 10}
// 4: get convertation tree
// 5: should able to response by id
