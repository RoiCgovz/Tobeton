// frontend/services/cardService.js
import api from '../config/api';

class CardService {
  // Get all cards for a specific folder
  async getCards(folderId) {
    try {
      const response = await api.getCards(folderId);
      return { 
        success: true, 
        data: response 
      };
    } catch (error) {
      console.error('Get cards error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Create a new card
  async createCard(folderId, question, answer) {
    try {
      const response = await api.createCard(folderId, question, answer);
      return { 
        success: true, 
        data: response,
        message: 'Card created successfully'
      };
    } catch (error) {
      console.error('Create card error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Update a card
  async updateCard(cardId, question, answer) {
    try {
      const response = await api.updateCard(cardId, question, answer);
      return { 
        success: true, 
        data: response,
        message: 'Card updated successfully'
      };
    } catch (error) {
      console.error('Update card error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Delete a card
  async deleteCard(cardId) {
    try {
      const response = await api.deleteCard(cardId);
      return { 
        success: true, 
        message: 'Card deleted successfully'
      };
    } catch (error) {
      console.error('Delete card error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
}

export default new CardService();