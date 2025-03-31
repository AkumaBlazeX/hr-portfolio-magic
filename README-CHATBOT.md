
# Chatbot API Integration Guide

This guide explains how to connect the chatbot widget to your own backend services.

## Overview

The chatbot widget is designed to communicate with two main API endpoints:

1. `GET /api/chat` - Retrieves chat history
2. `POST /api/chat` - Sends new messages and receives responses

## Current Implementation

Currently, the chatbot uses a mock API implementation for development purposes (in `src/utils/mockApi.ts`). In production, you'll want to replace this with your actual backend.

## How to Connect to Your Backend

### Step 1: Update the API Base URL

Open `src/utils/chatApi.ts` and update the `API_BASE_URL` constant:

```typescript
// Change this to your production API endpoint
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### Step 2: Configure Authentication (if needed)

If your API requires authentication, modify the fetch calls in `chatApi.ts` to include your auth headers:

```typescript
const response = await fetch(`${API_BASE_URL}/chat`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Add your auth token here
  },
  body: JSON.stringify({ message }),
});
```

### Step 3: Implement Your Backend API

Your backend needs to implement these two endpoints:

#### GET /api/chat

This endpoint should return chat history in this format:

```json
{
  "messages": [
    {
      "id": "1",
      "content": "Hello! How can I help you today?",
      "sender": "bot",
      "timestamp": "2023-07-21T14:30:00.000Z"
    },
    {
      "id": "2",
      "content": "I have a question about your services",
      "sender": "user",
      "timestamp": "2023-07-21T14:31:00.000Z"
    }
  ]
}
```

#### POST /api/chat

This endpoint should:
- Accept a JSON payload with the format: `{ "message": "User message here" }`
- Process the message
- Return a single message object in this format:

```json
{
  "id": "3",
  "content": "Here's the answer to your question about our services...",
  "sender": "bot",
  "timestamp": "2023-07-21T14:32:00.000Z"
}
```

### Step 4: Disable Mock API in Production

Before deploying to production, remove or disable the mock API initialization in `ChatWidget.tsx`:

```typescript
// Remove or comment out this useEffect
useEffect(() => {
  setupMockApi();
}, []);
```

## Real-time Updates (Optional)

For real-time chat functionality, consider implementing WebSockets:

1. Connect to your WebSocket server in `ChatWidget.tsx`
2. Subscribe to message events
3. Update the chat history when new messages arrive

## Message Storage Options

You have several options for storing chat messages:

1. **Database**: Store messages in a database like MongoDB or PostgreSQL
2. **Serverless**: Use serverless functions with a database
3. **Third-party services**: Integrate with services like Dialogflow, Intercom, or other chat platforms

## Testing Your Integration

1. Update the API endpoints as described above
2. Open your application and test sending/receiving messages
3. Check browser console for any API errors

## Troubleshooting

If you encounter issues:
1. Check browser console for API errors
2. Verify your API endpoints return data in the expected format
3. Ensure CORS is properly configured on your backend

