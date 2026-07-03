import type { MetadataRoute } from "next";
import { getProducts, getBlogs, getIndustries, getJobs } from "@/lib/api";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cardbox.example.com";

const staticRoutes = [
  "",
  "/about",
  "/process",
  "/infrastructure",
  "/quality",
  "/gallery",
  "/updates",
  "/contact",
  "/request-quote",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch dynamic content
    const [products, blogs, industries, jobs] = await Promise.all([
      getProducts({ limit: "500" }).catch(() => []),
      getBlogs({ limit: "500" }).catch(() => []),
      getIndustries().catch(() => []),
      getJobs().catch(() => []),
    ]);

    // Build product URLs
    const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt || product.createdAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Build blog URLs
    const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${siteUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.updatedAt || blog.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // Build industry URLs
    const industryUrls: MetadataRoute.Sitemap = industries.map((industry) => ({
      url: `${siteUrl}/industries/${industry.slug}`,
      lastModified: new Date(industry.updatedAt || industry.createdAt || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Build careers URLs
    const careerUrls: MetadataRoute.Sitemap = jobs.map((job) => ({
      url: `${siteUrl}/careers/${job._id}`,
      lastModified: new Date(job.updatedAt || job.createdAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    // Build static URLs
    const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }));

    // Combine all URLs (static, products, blogs, industries, careers)
    return [
      ...staticUrls,
      ...productUrls,
      ...blogUrls,
      ...industryUrls,
      ...careerUrls,
    ];
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
    // Fallback to static routes only
    return staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }));
  }
}
