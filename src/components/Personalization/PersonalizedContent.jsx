'use client';

import React, { useState } from 'react';
import { userAPI } from '@/services/api';
import MarkdownRenderer from '@/components/Book/MarkdownRenderer';

const PersonalizedContent = ({ chapterId, originalContent, title }) => {
  const [personalizedContent, setPersonalizedContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePersonalize = async () => {
    setLoading(true);
    setError('');
    setPersonalizedContent(null);

    try {
      const response = await userAPI.personalizeChapter({
        chapter_id: chapterId,
        user_profile: JSON.parse(localStorage.getItem('userProfile') || '{}')
      });

      setPersonalizedContent(response.data.personalized_content);
    } catch (err) {
      console.error('Error personalizing content:', err);
      setError('Failed to personalize content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPersonalizedContent(null);
    setError('');
  };

  return (
    <div className="personalized-content">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          {!personalizedContent ? (
            <button
              onClick={handlePersonalize}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              {loading ? 'Personalizing...' : 'Personalize Content'}
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
            >
              Reset to Original
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        {personalizedContent ? (
          <div>
            <div className="mb-2 text-sm text-gray-600 italic">
              Content adapted based on your profile
            </div>
            <MarkdownRenderer content={personalizedContent} />
          </div>
        ) : (
          <MarkdownRenderer content={originalContent} />
        )}
      </div>
    </div>
  );
};

export default PersonalizedContent;