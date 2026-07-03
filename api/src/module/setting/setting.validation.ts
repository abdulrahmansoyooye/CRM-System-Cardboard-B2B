import { z } from 'zod';

export const createSettingSchema = z.object({
  body: z.object({
    logo: z.string().optional(),
    favicon: z.string().optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z.object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
    }).strict().optional(),
    defaultSEO: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).strict().optional(),
    homepageHero: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      image: z.string().optional(),
    }).strict().optional(),
    ctaBanner: z.object({
      title: z.string().optional(),
      buttonText: z.string().optional(),
      buttonLink: z.string().optional(),
    }).strict().optional(),
    analyticsId: z.string().optional(),
  }).strict(),
});

export const updateSettingSchema = z.object({
  body: z.object({
    logo: z.string().optional(),
    favicon: z.string().optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
    address: z.string().optional(),
    socialLinks: z.object({
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      instagram: z.string().optional(),
    }).strict().optional(),
    defaultSEO: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).strict().optional(),
    homepageHero: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      image: z.string().optional(),
    }).strict().optional(),
    ctaBanner: z.object({
      title: z.string().optional(),
      buttonText: z.string().optional(),
      buttonLink: z.string().optional(),
    }).strict().optional(),
    analyticsId: z.string().optional(),
  }).strict(),
});

export const SettingValidation = {
  createSettingSchema,
  updateSettingSchema,
};
