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
  const isSecondBrain = pathname === '/second-brain';

  return (
    <>
      {!isSecondBrain && header}
      {children}
      {!isSecondBrain && footer}
    </>
  );
}
