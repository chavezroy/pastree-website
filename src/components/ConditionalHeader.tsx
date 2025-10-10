'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render header for support pages and report-bug page (they have their own layout)
  if (pathname.startsWith('/support') || pathname === '/report-bug') {
    return null;
  }
  
  // Show regular Header for all other pages
  return <Header />;
}
