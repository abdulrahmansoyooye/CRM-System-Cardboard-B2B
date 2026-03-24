
import { Router } from "express";
import { create, deactivate, getAll, getById, update } from "./user.controller";
import authMiddleware from '../../middleware/auth.middleware';

const router = Router()

router.post("/login", authMiddleware(["super_admin"]), create)

// router.get("/all",authMiddleware(["super_admin"]), getAll)
// router.get("/:id/details",authMiddleware(["super_admin","admin"]), getById)
// router.put("/:id/update",authMiddleware(["super_admin","admin"]), update)
// router.patch("/:id/deactivate",authMiddleware(["super_admin","admin"]), deactivate)

export const UserRoutes = router