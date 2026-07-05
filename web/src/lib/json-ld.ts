const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cardbox.example.com";

export function organizationJsonLd(companyName: string, tagline: string, logo?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    description: tagline,
    url: siteUrl,
    ...(logo && { logo: logo.startsWith("http") ? logo : `${siteUrl}${logo}` }),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-123-4567",
      contactType: "sales",
    },
  };
}

export function productJsonLd(
  name: string,
  slug: string,
  description?: string,
  image?: string,
  category?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description || "Industrial packaging solution",
    url: `${siteUrl}/products/${slug}`,
    ...(image && { image }),
    ...(category && {
      category,
    }),
  };
}

export function blogPostingJsonLd(
  title: string,
  slug: string,
  description?: string,
  datePublished?: string,
  image?: string,
  author?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || "Industrial packaging insights",
    url: `${siteUrl}/blog/${slug}`,
    ...(datePublished && { datePublished }),
    ...(image && { image }),
    author: {
      "@type": "Person",
      name: author || "CARDBOX Industrial",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function localBusinessJsonLd(
  companyName: string,
  description: string,
  address?: string,
  phone?: string,
  logo?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companyName,
    description,
    url: siteUrl,
    ...(address && { address: { "@type": "PostalAddress", streetAddress: address } }),
    ...(phone && { telephone: phone }),
    ...(logo && { image: logo.startsWith("http") ? logo : `${siteUrl}${logo}` }),
  };
}
