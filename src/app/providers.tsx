'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { BookProvider } from '@/context/BookContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <BookProvider>
        {children}
      </BookProvider>
    </AuthProvider>
  );
}