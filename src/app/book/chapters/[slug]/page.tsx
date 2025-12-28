import React from 'react';
import { notFound } from 'next/navigation';
import { getChapterBySlug, getAllChapters } from '@/services/bookService';
import ChapterNavigation from '@/src/components/Book/ChapterNavigation';
import MarkdownRenderer from '@/src/components/Book/MarkdownRenderer';
import ChatContainer from '@/components/Chat/ChatContainer';
import PersonalizedContent from '@/components/Personalization/PersonalizedContent';
import TranslationComponent from '@/components/Translation/TranslationComponent';
import ProgressTracker from '@/components/Progress/ProgressTracker';

export async function generateStaticParams() {
  try {
    const chapters = await getAllChapters();
    return chapters.map((chapter) => ({
      slug: chapter.slug,
    }));
  } catch (error) {
    console.error('Error fetching chapters for static generation:', error);
    return [];
  }
}

export default async function ChapterPage({ params }) {
  const { slug } = params;

  try {
    const chapter = await getChapterBySlug(slug);
    const allChapters = await getAllChapters();

    if (!chapter) {
      notFound();
    }

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-md p-8">
              <header className="mb-8 border-b border-gray-200 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{chapter.title}</h1>
                <div className="text-gray-600 text-sm">
                  Chapter {chapter.chapter_number} • {chapter.reading_time} min read
                </div>
              </header>

              <TranslationComponent
                chapterId={chapter.id}
                content={chapter.content}
                title={chapter.title}
              />
            </article>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask Questions About This Chapter</h2>
              <ChatContainer />
            </div>

            <div className="mt-8">
              <ChapterNavigation
                chapters={allChapters}
                currentChapterSlug={slug}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-4">
              <PersonalizedContent
                chapterId={chapter.id}
                originalContent={chapter.content}
                title="Personalize Content"
              />

              <ProgressTracker
                chapterId={chapter.id}
                userId={null} // Will be replaced with actual user ID when authentication is implemented
                onProgressUpdate={() => {}} // Will handle progress updates
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading chapter:', error);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Chapter</h2>
          <p className="text-red-600">Failed to load the requested chapter. Please try again later.</p>
        </div>
      </div>
    );
  }
}