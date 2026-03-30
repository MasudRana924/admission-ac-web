import axios from 'axios';

const ZENDESK_BASE_URL = 'https://zooberpayhelp.zendesk.com';
const ZENDESK_USERNAME = 'Sandeepsingh@zooberpay.com/token';
const ZENDESK_TOKEN = process.env.ZENDESK_TOKEN || 'LOGOLhjYkka77wu1MYVWjAjqa8DhUPlOXwz0Miwr';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { path } = req.query;
    if (!path || typeof path !== 'string') {
      return res.status(400).json({ error: 'Path parameter is required' });
    }

    const zendeskUrl = `${ZENDESK_BASE_URL}${path}`;
    
    const response = await axios.get(zendeskUrl, {
      auth: {
        username: ZENDESK_USERNAME,
        password: ZENDESK_TOKEN,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Zendesk API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch from Zendesk API',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
