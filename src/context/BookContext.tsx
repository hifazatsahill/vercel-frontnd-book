'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Chapter } from '@/types';

interface BookContextType {
  currentChapter: Chapter | null;
  setCurrentChapter: (chapter: Chapter) => void;
  chapters: Chapter[];
  setChapters: (chapters: Chapter[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export function BookProvider({ children }: { children: ReactNode }) {
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const value = {
    currentChapter,
    setCurrentChapter,
    chapters,
    setChapters,
    loading,
    setLoading,
    searchTerm,
    setSearchTerm,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

export function useBook() {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
}