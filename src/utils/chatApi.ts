/**
 * Chatbot API Service
 * 
 * This service provides methods to interact with the n8n chatbot webhook.
 */

export interface MessageType {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatHistoryType {
  messages: MessageType[];
}

// API Configuration
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5678/webhook/webhook-test/webhook/chat'
  : import.meta.env.VITE_WEBHOOK_URL;

if (!API_BASE_URL) {
  console.error('Warning: VITE_WEBHOOK_URL is not set in production environment');
}

/**
 * Fetches the chat history from the API
 * @returns A promise that resolves to the chat history
 */
export const getChatHistory = async (): Promise<ChatHistoryType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    // Return empty chat history if API fails
    return { messages: [] };
  }
};

/**
 * Sends a user message to the API and gets a response
 * @param message The user's message content
 * @returns A promise that resolves to the bot's response message
 */
export const sendMessage = async (message: string): Promise<MessageType> => {
  try {
    console.log('Attempting to send message to:', API_BASE_URL);
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        message,
        timestamp: Date.now(),
        source: 'portfolio-chat'
      }),
    });
    
    if (!response.ok) {
      console.error('API response not ok:', response.status, response.statusText);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Received response:', data);
    
    // Handle n8n response format
    const botMessage = data.response || data.message || data.input_message || "I couldn't process that message.";
    console.log('Using bot message:', botMessage);
    
    return {
      id: Date.now().toString(),
      content: botMessage,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to send message:', error);
    console.error('Current API URL:', API_BASE_URL);
    return {
      id: Date.now().toString(),
      content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
  }
};
