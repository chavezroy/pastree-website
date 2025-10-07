import type { SupportCategory } from './types';

export const categories: SupportCategory[] = [
  {
    id: 'installation',
    title: 'Installation & Setup',
    description: 'Download, install, and configure Pastree on your devices',
    iconKey: 'download',
    href: '/support/installation',
  },
  {
    id: 'usage',
    title: 'Using Pastree',
    description: 'Learn how to manage and organize your clipboard items',
    iconKey: 'usage',
    href: '/support/usage',
  },
  {
    id: 'settings',
    title: 'Settings & Preferences',
    description: 'Customize Pastree to work the way you want',
    iconKey: 'settings',
    href: '/support/settings',
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Solve common issues and technical problems',
    iconKey: 'troubleshoot',
    href: '/support/troubleshooting',
  },
];


