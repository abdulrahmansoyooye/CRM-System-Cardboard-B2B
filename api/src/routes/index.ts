import { Router } from 'express';
import { ProductRoutes } from '../module/product/product.route';
import { UserRoutes } from '../module/auth/user.routes';
import { CategoryRoutes } from '../module/category/category.route';
import { BlogRoutes } from '../module/blog/blog.route';
import { IndustryRoutes } from '../module/industry/industry.route';
import { JobRoutes } from '../module/job/job.route';
import { JobApplicationRoutes } from '../module/job_application/job_application.route';
import { InquiryRoutes } from '../module/inquiry/inquiry.route';
import { QuoteRoutes } from '../module/quote/quote.route';
import { SettingRoutes } from '../module/setting/setting.route';
import { TestimonialRoutes } from '../module/testimonial/testimonial.route';
import { AssetRoutes } from '../module/asset/asset.route';

const router = Router();

const moduleRoutes = [
  { path: '/', route: ProductRoutes },
  { path: '/auth', route: UserRoutes },
  { path: "/", route: CategoryRoutes },
  { path: '/', route: BlogRoutes },
  { path: '/', route: IndustryRoutes },
  { path: '/', route: JobRoutes },
  { path: '/', route: JobApplicationRoutes },
  { path: '/', route: InquiryRoutes },
  { path: '/', route: QuoteRoutes },
  { path: '/', route: SettingRoutes },
  { path: '/', route: TestimonialRoutes },
  { path: '/', route: AssetRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
