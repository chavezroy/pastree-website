export type SupportCategory = {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  href: string;
};

export type SupportArticle = {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  slug: string;
  updatedAt: string;
};

export type SupportUpdate = {
  date: string;
  title: string;
  href?: string;
};

export type SupportConfig = {
  hero: { title: string; subtitle: string };
  tutorial: { title: string; summary: string; videoUrl?: string };
};

// Ensure this file is treated as a module at runtime even after type erasure
export {};


