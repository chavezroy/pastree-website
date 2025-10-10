'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render header for support pages (they have their own layout)
  if (pathname.startsWith('/support')) {
    return null;
  }
  
  // Show regular Header for all other pages
  return <Header />;
}
