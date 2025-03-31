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
const API_BASE_URL = 'http://localhost:5678/webhook/webhook-test/webhook/chat';

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
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format the response from n8n
    return {
      id: data.timestamp.toString(),
      content: data.input_message,
      sender: 'bot',
      timestamp: new Date(parseInt(data.timestamp)).toISOString()
    };
  } catch (error) {
    console.error('Failed to send message:', error);
    return {
      id: Date.now().toString(),
      content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    };
  }
};
