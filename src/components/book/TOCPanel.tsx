'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TOCPanel = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Mock data for chapters - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call to fetch chapters
    const fetchChapters = async () => {
      try {
        // In a real implementation, this would be an API call:
        // const response = await bookAPI.getChapters();
        // setChapters(response.data);
        
        // For now, using mock data
        const mockChapters = [
          { id: 1, slug: 'introduction', title: 'Introduction', chapter_number: 1 },
          { id: 2, slug: 'machine-learning-basics', title: 'Machine Learning Basics', chapter_number: 2 },
          { id: 3, slug: 'deep-learning-applications', title: 'Deep Learning Applications', chapter_number: 3 },
          { id: 4, slug: 'neural-networks', title: 'Neural Networks', chapter_number: 4 },
          { id: 5, slug: 'computer-vision', title: 'Computer Vision in Diagnostics', chapter_number: 5 },
          { id: 6, slug: 'natural-language-processing', title: 'NLP for Medical Records', chapter_number: 6 },
          { id: 7, slug: 'data-preprocessing', title: 'Data Preprocessing', chapter_number: 7 },
          { id: 8, slug: 'model-evaluation', title: 'Model Evaluation', chapter_number: 8 },
          { id: 9, slug: 'ethical-considerations', title: 'Ethical Considerations', chapter_number: 9 },
          { id: 10, slug: 'future-directions', title: 'Future Directions', chapter_number: 10 },
        ];
        
        setChapters(mockChapters);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Table of Contents</h2>
      <ul className="space-y-2">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link
              href={`/book/chapters/${chapter.slug}`}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                pathname === `/book/chapters/${chapter.slug}`
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2 text-gray-500 dark:text-gray-400">
                {chapter.chapter_number}.
              </span>
              {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { TOCPanel };