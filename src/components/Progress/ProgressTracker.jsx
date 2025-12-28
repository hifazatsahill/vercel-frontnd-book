import React, { useState, useEffect } from 'react';
import { userAPI } from '@/services/api';

const ProgressTracker = ({ chapterId, userId, onProgressUpdate }) => {
  const [progress, setProgress] = useState({ progress_percentage: 0, notes: '', bookmarks: [] });
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [chapterId, userId]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      // For now, we'll simulate progress loading
      // In a real implementation, we'd fetch this from the API
      const mockProgress = {
        progress_percentage: 0,
        notes: '',
        bookmarks: [],
        completed: false
      };
      setProgress(mockProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
      setProgress({ progress_percentage: 0, notes: '', bookmarks: [] });
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (percentage) => {
    try {
      // In a real implementation, we'd call the API
      const updatedProgress = {
        ...progress,
        progress_percentage: percentage,
        completed: percentage >= 100
      };

      setProgress(updatedProgress);

      if (onProgressUpdate) {
        onProgressUpdate(updatedProgress);
      }
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const addNote = async () => {
    if (!newNote.trim()) return;

    try {
      const updatedNotes = [...progress.bookmarks, newNote]; // Using bookmarks array to store notes temporarily
      const updatedProgress = {
        ...progress,
        notes: newNote,
        bookmarks: updatedNotes
      };

      setProgress(updatedProgress);
      setNewNote('');

      if (onProgressUpdate) {
        onProgressUpdate(updatedProgress);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="progress-tracker bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Progress</h3>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{progress.progress_percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress.progress_percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Add Note</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note about this chapter..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={addNote}
            className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            Add
          </button>
        </div>
      </div>

      {progress.bookmarks.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your Notes</h4>
          <ul className="space-y-1">
            {progress.bookmarks.map((note, index) => (
              <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;