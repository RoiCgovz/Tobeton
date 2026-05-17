// frontend/services/authService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

class AuthService {
  async login(username, password) {
    try {
      const response = await api.login(username, password);
      
      if (response.token) {
        // Store token and user data
        await AsyncStorage.setItem('userToken', response.token);
        await AsyncStorage.setItem('username', username);
        
        // Store user ID if returned
        if (response.userId) {
          await AsyncStorage.setItem('userId', response.userId.toString());
        }
        
        return { 
          success: true, 
          data: response,
          message: response.message || 'Login successful'
        };
      }
      
      return { 
        success: false, 
        error: 'No token received from server' 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  async register(username, password) {
    try {
      const response = await api.register(username, password);
      return { 
        success: true, 
        data: response,
        message: response.message || 'Registration successful'
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('userId');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token !== null;
    } catch (error) {
      return false;
    }
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (error) {
      return null;
    }
  }

  async getUsername() {
    try {
      return await AsyncStorage.getItem('username');
    } catch (error) {
      return null;
    }
  }

  async getUserId() {
    try {
      const userId = await AsyncStorage.getItem('userId');
      return userId ? parseInt(userId) : null;
    } catch (error) {
      return null;
    }
  }
}

export default new AuthService();