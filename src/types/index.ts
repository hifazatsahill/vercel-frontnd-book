// User types
export interface User {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  profession?: string;
  experience_level?: string;
  technical_background?: string;
  preferences?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

export interface UserRegistrationData {
  email: string;
  name: string;
  password: string;
  profession?: string;
  experience_level?: string;
  technical_background?: string;
}

// Chapter types
export interface Chapter {
  id: string;
  title: string;
  slug: string;
  content?: string;
  content_urdu?: string;
  chapter_number: number;
  word_count?: number;
  reading_time?: number;
  chapter_metadata?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

// Progress types
export interface UserProgress {
  id: string;
  user_id: string;
  chapter_id: string;
  progress_percentage: number;
  time_spent?: number;
  notes?: string;
  bookmarks: string[];
  last_accessed?: string;
  completed: boolean;
  created_at: string;
  updated_at?: string;
}

// Chat types
export interface ChatSession {
  id: string;
  user_id?: string;
  session_token?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: string; // 'user' | 'assistant'
  content: string;
  context_type?: string;
  selected_text?: string;
  timestamp: string;
  sources: Array<Record<string, any>>;
}

export interface ChatQueryResponse {
  success: boolean;
  response: string;
  sources: Array<Record<string, any>>;
  confidence: number;
}

// Response types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

// Auth response types
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

// Personalization types
export interface PersonalizationResponse {
  success: boolean;
  original_content: string;
  personalized_content: string;
  adaptation_notes: string[];
}

// Translation types
export interface TranslationResponse {
  success: boolean;
  original_content: string;
  translated_content: string;
  source_language: string;
  target_language: string;
}

// Search types
export interface SearchResponse {
  id: string;
  title: string;
  content_snippet: string;
  relevance_score: number;
  chapter_slug: string;
  chapter_number: number;
}