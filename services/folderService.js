// frontend/services/folderService.js
import api from '../config/api';

class FolderService {
  // Get all folders for current user
  async getFolders() {
    try {
      const response = await api.getFolders();
      return { 
        success: true, 
        data: response 
      };
    } catch (error) {
      console.error('Get folders error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Create a new folder
  async createFolder(folder_name, subject, topic, difficulty = 'Beginner') {
    try {
      const response = await api.createFolder({
        folder_name,
        subject,
        topic,
        difficulty
      });
      return { 
        success: true, 
        data: response,
        message: 'Folder created successfully'
      };
    } catch (error) {
      console.error('Create folder error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Update folder
  async updateFolder(folderId, folder_name, subject, topic, difficulty) {
    try {
      const response = await api.updateFolder(folderId, {
        folder_name,
        subject,
        topic,
        difficulty
      });
      return { 
        success: true, 
        data: response,
        message: 'Folder updated successfully'
      };
    } catch (error) {
      console.error('Update folder error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Delete folder
  async deleteFolder(folderId) {
    try {
      const response = await api.deleteFolder(folderId);
      return { 
        success: true, 
        message: 'Folder deleted successfully'
      };
    } catch (error) {
      console.error('Delete folder error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
}

export default new FolderService();