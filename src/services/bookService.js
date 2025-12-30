import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Create an axios instance without auth interceptors for server-side calls
const serverApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Server-side API functions for book content
 * These functions can be used in Next.js server components
 */

export async function getAllChapters() {
  try {
    const response = await serverApi.get('/api/book/chapters');
    return response.data;
  } catch (error) {
    console.error('Error fetching all chapters:', error);
    throw error;
  }
}

export async function getChapterBySlug(slug) {
  try {
    const response = await serverApi.get(`/api/book/chapters/${slug}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error(`Error fetching chapter with slug ${slug}:`, error);
    throw error;
  }
}

export async function searchChapters(query) {
  try {
    const response = await serverApi.get('/api/book/search', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching chapters:', error);
    throw error;
  }
}