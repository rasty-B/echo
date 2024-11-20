import React, { useState } from 'react';
import { Send, Bot, FileText } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  model?: string;
};

export function ModelChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('llama2-3b');
  const [showFilePanel, setShowFilePanel] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated response from the local LLM.',
        sender: 'assistant',
        timestamp: new Date(),
        model: selectedModel,
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowFilePanel(true);
    // Handle file processing here
  };

  return (
    <div className="flex h-[600px] space-x-4">
      <div className="flex-1 flex flex-col"
           onDragOver={handleDragOver}
           onDrop={handleDrop}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-purple-500"
            >
              <option value="llama2-3b">Llama2 3B</option>
              <option value="nomic-embed">Nomic Embed</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.sender === 'assistant' && <Bot className="h-4 w-4" />}
                  <span className="text-sm font-medium">
                    {message.sender === 'user' ? 'You' : 'Assistant'}
                  </span>
                  {message.model && (
                    <span className="text-xs opacity-75">({message.model})</span>
                  )}
                </div>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>

      {showFilePanel && (
        <div className="w-80 border-l border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-gray-500" />
              <h3 className="font-medium text-gray-700">Files</h3>
            </div>
            <button
              onClick={() => setShowFilePanel(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <div className="prose prose-sm max-w-none">
            <p>Dropped files will appear here...</p>
          </div>
        </div>
      )}
    </div>
  );
}