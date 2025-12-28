'use client';

import React from 'react';
import ChatContainer from '@/components/Chat/ChatContainer';

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Medical Laboratory Diagnostics Assistant</h1>
        <p className="text-gray-600">Ask questions about the book content and get AI-powered answers</p>
      </header>

      <main>
        <ChatContainer />
      </main>
    </div>
  );
}