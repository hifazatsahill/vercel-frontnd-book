import React from 'react';
import Link from 'next/link';

const TableOfContents = ({ chapters }) => {
  if (!chapters || chapters.length === 0) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No chapters available.</p>
      </div>
    );
  }

  return (
    <div className="toc-container p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Table of Contents</h2>
      <ul className="space-y-2">
        {chapters
          .sort((a, b) => a.chapter_number - b.chapter_number)
          .map((chapter) => (
            <li key={chapter.id} className="border-b border-gray-100 pb-2">
              <Link
                href={`/book/chapters/${chapter.slug}`}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium py-1 block"
              >
                <span className="mr-3 text-gray-500 font-mono">{chapter.chapter_number}.</span>
                {chapter.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TableOfContents;