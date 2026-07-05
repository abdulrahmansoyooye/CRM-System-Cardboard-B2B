import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { UserController } from "./user.controller";

const router = Router()

router.post("/login", UserController.login)
router.post("/logout", UserController.logout)
router.post("/refresh-token", UserController.refresh)
router.post("/create", authMiddleware(["super_admin", "admin"]), UserController.create)

router.get("/all", authMiddleware(["super_admin", "admin"]), UserController.getAll)
router.get("/:id/details", authMiddleware(["super_admin", "admin"]), UserController.getById)
router.put("/:id/update", authMiddleware(["super_admin", "admin"]), UserController.update)
router.patch("/:id/deactivate", authMiddleware(["super_admin", "admin"]), UserController.deactivate)

export const AuthRoutes = router
