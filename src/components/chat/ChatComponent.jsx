'use client';

import React, { useState, useRef, useEffect } from 'react';
import { chatAPI } from '@/services/api';

const ChatComponent = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [useSelectedText, setUseSelectedText] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message to the chat
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare the query data based on whether we're using selected text
      const queryData = {
        query: inputValue,
        context_type: useSelectedText && selectedText ? 'selected_text' : 'full_book',
      };

      if (useSelectedText && selectedText) {
        queryData.selected_text = selectedText;
      }

      // Send the query to the backend
      const response = await chatAPI.query(queryData);

      // Add assistant response to the chat
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response,
        sources: response.data.sources || [],
        confidence: response.data.confidence,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSelectedText(''); // Clear selected text after successful query
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        isError: true,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSelection = () => {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
      setUseSelectedText(true);
    }
  };

  // Handle text selection on the page
  useEffect(() => {
    const handleGlobalSelection = () => {
      setTimeout(() => {
        const selectedText = window.getSelection().toString().trim();
        if (selectedText) {
          // Optionally, we could show a tooltip or button to use the selected text
          // For now, we'll just update the state
          setSelectedText(selectedText);
        }
      }, 10); // Small delay to allow selection to complete
    };

    document.addEventListener('mouseup', handleGlobalSelection);
    return () => {
      document.removeEventListener('mouseup', handleGlobalSelection);
    };
  }, []);

  return (
    <div className="chat-container flex flex-col h-full bg-gray-50 rounded-lg border border-gray-200">
      {/* Chat header */}
      <div className="chat-header bg-white p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">AI Medical Laboratory Diagnostics Assistant</h2>
        {selectedText && (
          <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
            <div className="flex items-center justify-between">
              <span className="text-blue-800">Using selected text as context:</span>
              <button
                onClick={() => setUseSelectedText(!useSelectedText)}
                className={`ml-2 px-2 py-1 rounded text-xs ${useSelectedText ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {useSelectedText ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            <p className="mt-1 text-gray-700 italic truncate">{selectedText}</p>
          </div>
        )}
      </div>

      {/* Messages container */}
      <div className="chat-messages flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Start a conversation by asking a question about the medical AI content.</p>
            <p className="mt-2 text-sm">You can select text on the page to use as context for your questions.</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.isError
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-1">Sources:</p>
                    <ul className="text-xs text-gray-600 list-disc list-inside">
                      {message.sources.map((source, idx) => (
                        <li key={idx}>{source}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {message.confidence !== undefined && (
                  <div className="mt-1 text-xs text-gray-600">
                    Confidence: {(message.confidence * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="chat-input bg-white p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          {selectedText && !useSelectedText && (
            <div className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                id="useSelectedText"
                checked={useSelectedText}
                onChange={(e) => setUseSelectedText(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="useSelectedText">
                Use selected text as context: <span className="italic truncate max-w-xs">{selectedText}</span>
              </label>
            </div>
          )}
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about the book content..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;