import { Router } from 'express';
import { ProductRoutes } from '../module/product/product.route';
import { AuthRoutes } from '../module/auth/user.routes';
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
import { EventRoutes } from '../module/event/event.route';

const router = Router();

/*
 * All module route files define their own full path prefixes.
 * The mount path for most is '/' because each router internally
 * registers both public paths (e.g., /products, /blogs, /contact)
 * and admin paths (e.g., /admin/products, /admin/blogs).
 *
 * Auth is the exception, mounted at /auth for logical separation.
 *
 * ┌──────────────┬─────────────────────────────────────────────┐
 * │ Module       │ Public paths                                │
 * ├──────────────┼─────────────────────────────────────────────┤
 * │ Product      │ /products, /products/:slug                  │
 * │ Category     │ /categories, /categories/:slug              │
 * │ Blog         │ /blogs, /blogs/:slug                        │
 * │ Industry     │ /industries, /industries/:slug              │
 * │ Job          │ /jobs, /jobs/:id                            │
 * │ JobApp       │ /jobs/apply                                 │
 * │ Inquiry      │ /contact                                    │
 * │ Quote        │ /quote                                      │
 * │ Setting      │ /settings                                   │
 * │ Testimonial  │ /testimonials, /testimonials/:id            │
 * │ Asset        │ /assets                                     │
 * │ Event        │ /events, /events/:id                        │
 * │ Auth (mount) │ /auth/login, /auth/logout, /auth/create     │
 * └──────────────┴─────────────────────────────────────────────┘
 *
 * Admin paths follow the pattern /admin/{resource} and are
 * protected by authMiddleware(['admin', 'super_admin']).
 */
const moduleRoutes = [
  { path: '/', route: ProductRoutes },
  { path: '/', route: CategoryRoutes },
  { path: '/', route: BlogRoutes },
  { path: '/', route: IndustryRoutes },
  { path: '/', route: JobRoutes },
  { path: '/', route: JobApplicationRoutes },
  { path: '/', route: InquiryRoutes },
  { path: '/', route: QuoteRoutes },
  { path: '/', route: SettingRoutes },
  { path: '/', route: TestimonialRoutes },
  { path: '/', route: AssetRoutes },
  { path: '/', route: EventRoutes },
  { path: '/auth', route: AuthRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
