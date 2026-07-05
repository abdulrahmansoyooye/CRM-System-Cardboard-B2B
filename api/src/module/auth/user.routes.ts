import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validateRequest } from "../../middleware/validate.middleware";
import { UserController } from "./user.controller";
import { createUserSchema, loginSchema, refreshTokenSchema } from "./user.validation";

const router = Router()

router.post("/login", validateRequest(loginSchema), UserController.login)
router.post("/logout", UserController.logout)
router.post("/refresh-token", validateRequest(refreshTokenSchema), UserController.refresh)
router.post("/create", authMiddleware(["super_admin", "admin"]), validateRequest(createUserSchema), UserController.create)

router.get("/all", authMiddleware(["super_admin", "admin"]), UserController.getAll)
router.get("/:id/details", authMiddleware(["super_admin", "admin"]), UserController.getById)
router.put("/:id/update", authMiddleware(["super_admin", "admin"]), UserController.update)
router.patch("/:id/deactivate", authMiddleware(["super_admin", "admin"]), UserController.deactivate)

export const AuthRoutes = router

// Admin-friendly routes matching /admin/users pattern used by other modules.
// The admin frontend calls these endpoints instead of /auth/*.
const adminRouter = Router()
adminRouter.get("/admin/users", authMiddleware(["super_admin", "admin"]), UserController.getAll)
adminRouter.post("/admin/users", authMiddleware(["super_admin", "admin"]), validateRequest(createUserSchema), UserController.create)
adminRouter.put("/admin/users/:id", authMiddleware(["super_admin", "admin"]), UserController.update)
adminRouter.delete("/admin/users/:id", authMiddleware(["super_admin", "admin"]), UserController.deactivate)

export const AdminUserRoutes = adminRouter
