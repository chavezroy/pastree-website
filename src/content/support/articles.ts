import type { SupportArticle, SupportUpdate } from './types';

export const popularArticles: SupportArticle[] = [
  {
    id: 'install-extension',
    categoryId: 'installation',
    title: 'How to install Pastree browser extension',
    description: 'Step-by-step installation guide for Chrome and Firefox',
    slug: 'install-extension',
    updatedAt: '2024-12-15'
  },
  {
    id: 'installation-setup',
    categoryId: 'installation',
    title: 'Complete Installation & Setup Guide',
    description: 'Comprehensive installation and configuration guide with tips and best practices',
    slug: 'installation-setup',
    updatedAt: '2024-12-16'
  },
  {
    id: 'manage-lists',
    categoryId: 'usage',
    title: 'Creating and managing clipboard lists',
    description: 'Organize your frequently used text into categories',
    slug: 'manage-lists',
    updatedAt: '2024-12-12'
  },
  {
    id: 'keyboard-shortcuts',
    categoryId: 'usage',
    title: 'Keyboard shortcuts and hotkeys',
    description: 'Speed up your workflow with keyboard shortcuts',
    slug: 'keyboard-shortcuts',
    updatedAt: '2024-12-08'
  },
  {
    id: 'troubleshoot-sync',
    categoryId: 'troubleshooting',
    title: 'Troubleshooting clipboard sync issues',
    description: 'Fix problems with clipboard not working properly',
    slug: 'troubleshoot-sync',
    updatedAt: '2024-12-13'
  }
];

export const popularArticleLinks = popularArticles.map(a => ({
  title: a.title,
  description: a.description,
  href: `/support/${a.categoryId}/${a.slug}`,
}));

export const recentUpdates: SupportUpdate[] = [
  { date: 'Dec 15, 2024', title: 'Pastree v1.1 - New list categories and improved UI' },
  { date: 'Nov 28, 2024', title: 'Firefox extension now available' },
  { date: 'Nov 10, 2024', title: 'Enhanced security features and bug fixes' },
];


