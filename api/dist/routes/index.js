"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_route_1 = require("../module/product/product.route");
const user_routes_1 = require("../module/auth/user.routes");
const category_route_1 = require("../module/category/category.route");
const blog_route_1 = require("../module/blog/blog.route");
const industry_route_1 = require("../module/industry/industry.route");
const job_route_1 = require("../module/job/job.route");
const job_application_route_1 = require("../module/job_application/job_application.route");
const inquiry_route_1 = require("../module/inquiry/inquiry.route");
const quote_route_1 = require("../module/quote/quote.route");
const setting_route_1 = require("../module/setting/setting.route");
const testimonial_route_1 = require("../module/testimonial/testimonial.route");
const asset_route_1 = require("../module/asset/asset.route");
const event_route_1 = require("../module/event/event.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/', route: product_route_1.ProductRoutes },
    { path: '/auth', route: user_routes_1.UserRoutes },
    { path: "/", route: category_route_1.CategoryRoutes },
    { path: '/', route: blog_route_1.BlogRoutes },
    { path: '/', route: industry_route_1.IndustryRoutes },
    { path: '/', route: job_route_1.JobRoutes },
    { path: '/', route: job_application_route_1.JobApplicationRoutes },
    { path: '/', route: inquiry_route_1.InquiryRoutes },
    { path: '/', route: quote_route_1.QuoteRoutes },
    { path: '/', route: setting_route_1.SettingRoutes },
    { path: '/', route: testimonial_route_1.TestimonialRoutes },
    { path: '/', route: asset_route_1.AssetRoutes },
    { path: '/', route: event_route_1.EventRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
//# sourceMappingURL=index.js.map