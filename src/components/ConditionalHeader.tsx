'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't render header for support pages, report-bug page, and email-support page (they have their own layout)
  if (pathname.startsWith('/support') || pathname === '/report-bug' || pathname === '/email-support') {
    return null;
  }
  
  // Show regular Header for all other pages
  return <Header />;
}
