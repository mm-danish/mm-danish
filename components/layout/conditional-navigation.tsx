'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

export function ConditionalNavigation({ 
  children,
  header,
  footer 
}: { 
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideChrome =
    pathname === '/second-brain' ||
    pathname === '/notes' ||
    pathname.startsWith('/notes/');

  return (
    <>
      {!hideChrome && header}
      {children}
      {!hideChrome && footer}
    </>
  );
}
