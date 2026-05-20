// frontend/config/api.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Get the correct base URL based on platform and environment
const getBaseUrl = () => {
  // For production
  if (!__DEV__) {
    return 'https://your-production-server.com'; // Change to your production URL
  }

  // For development
  if (Platform.OS === 'android') {
    // For Android physical device - USE YOUR IP
    return 'http://10.83.2.162:5000';
  }

  // iOS Simulator or physical device
  return 'http://localhost:5000';
};

const API_BASE_URL = getBaseUrl();

console.log('API Base URL:', API_BASE_URL); // This helps debug connection issues

// API request helper
const apiRequest = async (endpoint, method, data = null, requiresAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add authorization token if required
  if (requiresAuth) {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      throw new Error('Authentication required');
    }
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        // Token expired or invalid
        await AsyncStorage.removeItem('userToken');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(responseData.error || 'Request failed');
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Export all API methods
export default {
  // Auth endpoints (no auth required)
  login: (username, password) =>
    apiRequest('/auth/login', 'POST', { username, password }, false),

  register: (username, password) =>
    apiRequest('/auth/register', 'POST', { username, password }, false),

  get: (endpoint) =>
    apiRequest(endpoint, 'GET', null, true),

  // User endpoints (auth required)
  updateUsername: (userId, newUsername) =>
    apiRequest('/users/update-username', 'PUT', { userId, newUsername }, true),

  updatePassword: (userId, currentPassword, newPassword) =>
    apiRequest('/users/update-password', 'PUT', { userId, currentPassword, newPassword }, true),

  // frontend/config/api.js - CORRECTED VERSION

  // Folder endpoints - Updated to match your backend routes
  getFolders: () =>
    apiRequest('/folders/get', 'GET', null, true),

  createFolder: (folderData) =>
    apiRequest('/folders/create', 'POST', {
      folder_name: folderData.folder_name,
      subject: folderData.subject,
      topic: folderData.topic,
      difficulty: folderData.difficulty || 'Beginner'
    }, true),

  updateFolder: (folderId, folderData) =>
    apiRequest(`/folders/${folderId}`, 'PUT', {
      folder_name: folderData.folder_name,
      subject: folderData.subject,
      topic: folderData.topic,
      difficulty: folderData.difficulty || 'Beginner'
    }, true),

  deleteFolder: (folderId) =>
    apiRequest(`/folders/${folderId}`, 'DELETE', null, true),
  
  // Cards endpoints
  getCards: (folderId) =>
    apiRequest(`/cards/${folderId}`, 'GET', null, true),

  createCard: (folderId, question, answer) =>
    apiRequest('/cards', 'POST', { folderId, question, answer }, true),

  updateCard: (cardId, question, answer) =>
    apiRequest(`/cards/${cardId}`, 'PUT', { question, answer }, true),

  deleteCard: (cardId) =>
    apiRequest(`/cards/${cardId}`, 'DELETE', null, true),

  // Statistics endpoints
  getStatistics: () =>
    apiRequest('/statistics', 'GET', null, true),

  updateStatistics: (stats) =>
    apiRequest('/statistics', 'PUT', stats, true),

  // Quiz endpoints
  getQuiz: (folderId) =>
    apiRequest(`/quiz/${folderId}`, 'GET', null, true),

  submitQuiz: (folderId, answers) =>
    apiRequest('/quiz/submit', 'POST', { folderId, answers }, true),
};