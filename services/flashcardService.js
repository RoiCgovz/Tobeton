// frontend/services/flashcardService.js
import api from '../config/api';

class FlashcardService {
  // Get flashcards for a folder
  async getFlashcardsByFolder(folderId) {
    try {
      const response = await api.getFlashcardsByFolder(folderId);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get random flashcards (for studying)
  async getRandomFlashcards(folderId) {
    try {
      const response = await api.getRandomFlashcards(folderId);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Search flashcards
  async searchFlashcards(keyword) {
    try {
      const response = await api.searchFlashcards(keyword);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Mark study time
  async markFlashcardStudied(seconds) {
    try {
      const response = await api.markFlashcardStudied(seconds);
      return { success: true, data: response };
    } catch (error) {
      console.error('Mark study error:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new FlashcardService();