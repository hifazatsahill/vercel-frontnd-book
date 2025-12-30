'use client';

import React, { useState } from 'react';
import { bookAPI } from '@/services/api';
import MarkdownRenderer from '@/components/Book/MarkdownRenderer';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await bookAPI.search(query);
      setResults(response.data);
    } catch (err) {
      setError('Failed to search chapters. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Book Content</h1>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter search term..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </header>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <main>
        {results.length > 0 ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </h2>
            {results.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">{result.title}</h3>
                <div className="text-sm text-gray-600 mb-3">
                  Chapter {result.chapter_number} • Relevance: {result.relevance_score?.toFixed(2) || 'N/A'}
                </div>
                <div className="text-gray-700">
                  <MarkdownRenderer content={result.content_snippet || result.content} />
                </div>
              </div>
            ))}
          </div>
        ) : query && !loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No results found for "{query}"</p>
          </div>
        ) : null}
      </main>
    </div>
  );
}