import React from 'react';
import Link from 'next/link';

const TableOfContents = ({ chapters }) => {
  if (!chapters || chapters.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No chapters available.</p>
      </div>
    );
  }

  return (
    <div className="toc-container bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Table of Contents</h2>
      <div className="space-y-2">
        {chapters.map((chapter, index) => (
          <div 
            key={chapter.id} 
            className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 transition-colors"
          >
            <Link 
              href={`/book/chapters/${chapter.slug}`} 
              className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
            >
              <span className="mr-2 text-blue-600 font-semibold">{chapter.chapter_number}.</span>
              {chapter.title}
            </Link>
            <p className="text-sm text-gray-600 mt-1">{chapter.description || 'Chapter description coming soon.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOfContents;