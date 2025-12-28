'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { authAPI, userAPI } from '@/services/api';
import PersonalizationSettings from '@/components/Personalization/PersonalizationSettings';
import ChatContainer from '@/components/Chat/ChatContainer';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profileResponse = await authAPI.getProfile();
      setUser(profileResponse.data);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600">Your personalized learning dashboard</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ask the AI Assistant</h2>
            <ChatContainer />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-6">
            <PersonalizationSettings />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/book" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Browse Book Chapters
                  </a>
                </li>
                <li>
                  <a href="/chat" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Full Chat Interface
                  </a>
                </li>
                <li>
                  <a href="/book/search" className="text-blue-600 hover:text-blue-800 hover:underline">
                    Search Book Content
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}