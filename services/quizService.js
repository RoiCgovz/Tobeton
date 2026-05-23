import api from '../config/api';

class QuizService {
  // Get all quizzes for a folder
  async getQuizzesByFolder(folderId) {
    try {
      const response = await api.getQuizzesByFolder(folderId);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Create a new quiz
  async createQuiz(folderId) {
    try {
      const response = await api.createQuiz(folderId);
      return {
        success: true,
        data: response,
        message: 'Quiz created successfully'
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Submit quiz answer
  async submitQuizAnswer(quizId, userAnswer) {
    try {
      const response = await api.submitQuizAnswer(quizId, userAnswer);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete quiz
  async deleteQuiz(quizId) {
    try {
      const response = await api.deleteQuiz(quizId);
      return { success: true, message: 'Quiz deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

export default new QuizService();