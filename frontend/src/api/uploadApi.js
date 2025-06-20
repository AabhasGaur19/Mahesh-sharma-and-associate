// src/api/uploadApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Added fallback

console.log('API URL:', API_URL); // Debug log

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  console.log('Uploading file:', file.name, 'to:', `${API_URL}/api/upload`);

  try {
    const response = await axios.post(`${API_URL}/api/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000, // 30 second timeout
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
      }
    });
    
    console.log('Upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.code === 'ECONNREFUSED') {
      throw 'Cannot connect to server. Please make sure the backend is running on port 5000.';
    }
    
    if (error.response) {
      // Server responded with error status
      console.error('Server error response:', error.response.data);
      throw error.response.data?.error || `Server error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      throw 'No response from server. Please check if the backend is running.';
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      throw error.message || 'Failed to upload file';
    }
  }
};