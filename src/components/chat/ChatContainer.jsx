'use client';

import React, { useState, useEffect } from 'react';
import ChatComponent from './ChatComponent';

const ChatContainer = ({ initialMessages = [], context = 'full_book' }) => {
  const [messages, setMessages] = useState(initialMessages);

  // This component can be used to wrap the chat with additional functionality
  // like session management, context switching, etc.

  return (
    <div className="chat-wrapper h-[600px] w-full max-w-4xl mx-auto">
      <ChatComponent initialMessages={messages} />
    </div>
  );
};

export default ChatContainer;