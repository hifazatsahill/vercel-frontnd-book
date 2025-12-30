'use client';

import React, { useState } from 'react';
import { userAPI } from '@/services/api';
import MarkdownRenderer from '@/components/Book/MarkdownRenderer';

const TranslationComponent = ({ chapterId, content, title }) => {
  const [translatedContent, setTranslatedContent] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async (targetLanguage = 'ur') => {
    setLoading(true);
    setError('');

    try {
      const response = await userAPI.translateChapter({
        chapter_id: chapterId,
        target_language: targetLanguage
      });

      setTranslatedContent(response.data.translated_content);
      setCurrentLanguage(targetLanguage);
    } catch (err) {
      console.error('Error translating content:', err);
      setError('Failed to translate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchBack = () => {
    setTranslatedContent(null);
    setCurrentLanguage('en');
    setError('');
  };

  const isTranslated = currentLanguage === 'ur';

  return (
    <div className="translation-component">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          {!isTranslated ? (
            <button
              onClick={() => handleTranslate('ur')}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              {loading ? 'Translating...' : 'Translate to Urdu'}
            </button>
          ) : (
            <button
              onClick={handleSwitchBack}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 text-sm"
            >
              Switch to English
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
        {isTranslated && translatedContent ? (
          <div>
            <div className="mb-2 text-sm text-gray-600 italic">
              Content translated to Urdu
            </div>
            <div className="rtl" dir="rtl">
              <MarkdownRenderer content={translatedContent} />
            </div>
          </div>
        ) : (
          <MarkdownRenderer content={content} />
        )}
      </div>
    </div>
  );
};

export default TranslationComponent;