import api from '../config/api';

class StatisticsService {
  // Get user statistics
  async getStatistics() {
    try {
      const response = await api.getStatistics();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update quiz statistics after each answer
  async updateQuizStatistics(quizResult) {
    try {
      console.log("Sending to API:", { is_correct: quizResult.is_correct ? 1 : 0 });
      const response = await api.updateQuizStatistics({
        is_correct: quizResult.is_correct ? 1 : 0
      });
      return { success: true, data: response };
    } catch (error) {
      console.error("Update quiz stats error:", error);
      return { success: false, error: error.message };
    }
  }

  // Update quiz study time
  async updateQuizStudyTime(seconds) {
    try {
      const response = await api.updateQuizStudyTime(seconds);
      return { success: true, data: response };
    } catch (error) {
      console.error("Update quiz study time error:", error);
      return { success: false, error: error.message };
    }
  }

  // Update flashcard study time
  async updateFlashcardStudyTime(seconds) {
    try {
      const response = await api.updateStudyTime(seconds);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update app usage time (track when app is open)
  async updateAppUsageTime(seconds) {
    try {
      const response = await api.updateAppUsageTime(seconds);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get today's quiz stats
  async getTodayQuizStats() {
    try {
      const response = await api.getTodayQuizStats();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get streak
  async getStreak() {
    try {
      const response = await api.getStreak();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ✅ ADD THIS - Get weekly statistics (last 7 days)
  async getWeeklyStats() {
    try {
      const response = await api.getWeeklyStats();
      return { success: true, data: response };
    } catch (error) {
      console.error("Get weekly stats error:", error);
      return { success: false, error: error.message };
    }
  }
}

export default new StatisticsService();