import { roleMiddleware } from './../../middleware/role.middleware';
import { Router } from "express";
import { create, deactivate, getAll, getById, update } from "./user.controller";
import authMiddleware from '../../middleware/auth.middleware';

const router = Router()

router.post("/",authMiddleware,roleMiddleware(["admin","super_admin"]) create)
router.get("/",authMiddleware, getAll)
router.get("/:id",authMiddleware, getById)
router.put("/:id",authMiddleware, update)
router.patch("/:id/deactivate",authMiddleware, deactivate)

export default router