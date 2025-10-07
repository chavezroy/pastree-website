import type { SupportArticle, SupportUpdate } from './types';

export const popularArticles: Pick<SupportArticle, 'title' | 'description' | 'slug'>[] = [
  {
    title: 'How to install Pastree browser extension',
    description: 'Step-by-step installation guide for Chrome and Firefox',
    slug: 'install-extension',
  },
  {
    title: 'Creating and managing clipboard lists',
    description: 'Organize your frequently used text into categories',
    slug: 'manage-lists',
  },
  {
    title: 'Keyboard shortcuts and hotkeys',
    description: 'Speed up your workflow with keyboard shortcuts',
    slug: 'keyboard-shortcuts',
  },
  {
    title: 'Troubleshooting clipboard sync issues',
    description: 'Fix problems with clipboard not working properly',
    slug: 'troubleshoot-sync',
  },
];

export const recentUpdates: SupportUpdate[] = [
  { date: 'Dec 15, 2024', title: 'Pastree v1.1 - New list categories and improved UI' },
  { date: 'Nov 28, 2024', title: 'Firefox extension now available' },
  { date: 'Nov 10, 2024', title: 'Enhanced security features and bug fixes' },
];


