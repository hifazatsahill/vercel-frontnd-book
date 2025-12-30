'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ChapterNavigation = ({ chapters, currentChapterSlug }) => {
  const pathname = usePathname();

  if (!chapters || chapters.length === 0) {
    return null;
  }

  // Find current chapter index
  const currentChapterIndex = chapters.findIndex(chapter => chapter.slug === currentChapterSlug);
  const previousChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  return (
    <div className="chapter-navigation flex justify-between items-center py-6 border-t border-b border-gray-200 my-8">
      <div className="flex-1">
        {previousChapter && (
          <Link href={`/book/chapters/${previousChapter.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
            ← {previousChapter.title}
          </Link>
        )}
      </div>

      <div className="flex-1 text-center">
        <Link href="/book" className="text-gray-600 hover:text-gray-800 font-medium">
          Table of Contents
        </Link>
      </div>

      <div className="flex-1 text-right">
        {nextChapter && (
          <Link href={`/book/chapters/${nextChapter.slug}`} className="text-blue-600 hover:text-blue-800 font-medium">
            {nextChapter.title} →
          </Link>
        )}
      </div>
    </div>
  );
};

export default ChapterNavigation;