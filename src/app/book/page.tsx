import React from 'react';
import { getAllChapters } from '@/services/bookService';
import TableOfContents from '@/components/Book/TableOfContents';

export default async function BookPage() {
  let chapters = [];

  try {
    chapters = await getAllChapters();
  } catch (error) {
    console.error('Error fetching chapters:', error);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI in Medical Laboratory Diagnostics</h1>
        <p className="text-xl text-gray-600 mb-8">An Interactive Digital Book</p>
      </header>

      <main>
        <TableOfContents chapters={chapters} />
      </main>
    </div>
  );
}