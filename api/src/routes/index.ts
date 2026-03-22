import { Router } from 'express';
import { ProductRoutes } from '../module/product/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/products',
    route: ProductRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
