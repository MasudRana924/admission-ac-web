import axios from 'axios';

const ZENDESK_BASE_URL = 'https://zooberpayhelp.zendesk.com';

// Create a separate axios instance for Zendesk API with basic auth
export const zendeskClient = axios.create({
  baseURL: ZENDESK_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  auth: {
    username: 'Sandeepsingh@zooberpay.com/token',
    password: 'LOGOLhjYkka77wu1MYVWjAjqa8DhUPlOXwz0Miwr',
  },
});

export const zendeskService = {
  getUserTickets: async (userId: string) => {
    try {
      const response = await zendeskClient.get(`/api/v2/users/${userId}/tickets/requested.json`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Zendesk tickets:', error);
      throw error;
    }
  },
};
