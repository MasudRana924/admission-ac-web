import axios from 'axios';

// Environment-based configuration
const ZENDESK_BASE_URL = import.meta.env.VITE_ZENDESK_BASE_URL || 
  (import.meta.env.PROD ? '' : '/api/zendesk');

const ZENDESK_USERNAME = import.meta.env.VITE_ZENDESK_USERNAME || 'Sandeepsingh@zooberpay.com/token';
const ZENDESK_TOKEN = import.meta.env.VITE_ZENDESK_TOKEN || 'LOGOLhjYkka77wu1MYVWjAjqa8DhUPlOXwz0Miwr';

// Create a separate axios instance for Zendesk API with basic auth
export const zendeskClient = axios.create({
  baseURL: ZENDESK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add auth for development (Vite proxy), remove for production (serverless handles auth)
  ...(import.meta.env.DEV && {
    auth: {
      username: ZENDESK_USERNAME,
      password: ZENDESK_TOKEN,
    },
  }),
});

export const zendeskService = {
  getUserTickets: async (userId: string) => {
    try {
      const endpoint = import.meta.env.PROD 
        ? `/api/zendesk?path=/api/v2/users/${userId}/tickets/requested.json`
        : `/api/v2/users/${userId}/tickets/requested.json`;
      
      const response = await zendeskClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error fetching Zendesk tickets:', error);
      throw error;
    }
  },
};
