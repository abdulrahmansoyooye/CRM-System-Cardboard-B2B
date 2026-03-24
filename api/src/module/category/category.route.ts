import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { CategoryController } from "./category.controller";
import { validateRequest } from "../../middleware/validate.middleware";
import { CategoryValidation } from "./category.validation";

const router = Router();

// Public Routes
router.get("/categories", CategoryController.getAll);
router.get("/categories/:slug", CategoryController.getBySlug);

// Admin Routes
router.post(
  "/admin/categories",
  authMiddleware(["super_admin", "admin"]),
  validateRequest(CategoryValidation.createCategorySchema),
  CategoryController.create
);

router.put(
  "/admin/categories/:id",
  authMiddleware(["super_admin", "admin"]),
  validateRequest(CategoryValidation.updateCategorySchema),
  CategoryController.update
);

router.delete(
  "/admin/categories/:id",
  authMiddleware(["super_admin", "admin"]),
  CategoryController.deleteCategory
);

export const CategoryRoutes = router;