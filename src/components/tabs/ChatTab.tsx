import React, { useState, useCallback, useEffect } from 'react';
import { Send, Bot, FileText, Plus } from 'lucide-react';
import { FileUpload } from '../FileUpload';
import { generateResponse, getModels } from '../../lib/ollama';
import type { Message } from '../../types';

export function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [availableModels, setAvailableModels] = useState<Array<{name: string}>>([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [showFilePanel, setShowFilePanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Array<{id: string; name: string}>>([]);
  const [showQuickProject, setShowQuickProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const models = await getModels();
      setAvailableModels(models);
      if (models.length > 0) {
        setSelectedModel(models[0].name);
      }
    };
    loadModels();
  }, []);

  const handleQuickProjectCreate = () => {
    if (!newProjectName.trim()) return;
    
    const newProject = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
    };
    
    setProjects([...projects, newProject]);
    setSelectedProject(newProject.id);
    setNewProjectName('');
    setShowQuickProject(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !selectedModel) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateResponse(input, selectedModel);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
        model: selectedModel,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error generating the response. Please try again.',
        sender: 'assistant',
        timestamp: new Date(),
        model: selectedModel,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] space-x-4">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4 space-x-4">
          <div className="flex items-center space-x-2 flex-1">
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="rounded-lg bg-zinc-900 border-zinc-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent flex-1"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowQuickProject(true)}
              className="p-2 text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="rounded-lg bg-zinc-900 border-zinc-700 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            >
              {availableModels.length === 0 ? (
                <option value="">No models available</option>
              ) : (
                availableModels.map(model => (
                  <option key={model.name} value={model.name}>
                    {model.name}
                  </option>
                ))
              )}
            </select>
            <button
              onClick={() => setShowFilePanel(!showFilePanel)}
              className="p-2 text-zinc-400 hover:text-yellow-400 transition-colors"
            >
              <FileText className="h-5 w-5" />
            </button>
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
                    ? 'bg-yellow-400 text-black'
                    : 'bg-zinc-800 text-white'
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
            className="flex-1 rounded-lg bg-zinc-900 border-zinc-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            disabled={isLoading || !selectedModel}
            className="bg-yellow-400 text-black rounded-lg px-4 py-2 hover:bg-yellow-300 transition-colors disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>

      {showFilePanel && (
        <div className="w-80 border-l border-zinc-800 p-4">
          <FileUpload />
        </div>
      )}
    </div>
  );
}