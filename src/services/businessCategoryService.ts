import axios from 'axios';

export const getBusinessCategories = async () => {
  try {
    const response = await axios.get('/api/business-categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching business categories:', error);
    throw error;
  }
};
