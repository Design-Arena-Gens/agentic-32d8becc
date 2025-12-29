'use client';

import { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Hello! I\'m Brian, your open-source AI assistant. I can help you search the web, get information, answer questions, and assist with various tasks. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input, history: messages }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMarkdown = (content: string) => {
    const html = marked.parse(content) as string;
    return { __html: html };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex flex-col">
      <header className="bg-black bg-opacity-50 backdrop-blur-md p-4 border-b border-purple-500">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
            B
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Brian AI Assistant</h1>
            <p className="text-sm text-gray-300">Open-source • Privacy-focused • No API costs</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col max-w-6xl w-full mx-auto">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : message.role === 'system'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.role !== 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      B
                    </div>
                  )}
                  <div className="flex-1 overflow-hidden">
                    <div
                      className="prose prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:text-gray-100"
                      dangerouslySetInnerHTML={renderMarkdown(message.content)}
                    />
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-800 rounded-lg p-4 max-w-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm font-bold">
                    B
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-black bg-opacity-50 backdrop-blur-md border-t border-purple-500">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Brian anything..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Send
            </button>
          </form>
          <div className="mt-2 flex gap-2 flex-wrap">
            <button
              onClick={() => setInput('What is the weather like today?')}
              className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-gray-300"
            >
              Weather
            </button>
            <button
              onClick={() => setInput('Tell me the latest news')}
              className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-gray-300"
            >
              News
            </button>
            <button
              onClick={() => setInput('Help me with Ubuntu commands')}
              className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-gray-300"
            >
              Ubuntu Help
            </button>
            <button
              onClick={() => setInput('Search for information about AI')}
              className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-gray-300"
            >
              Search
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-black bg-opacity-50 backdrop-blur-md p-3 border-t border-purple-500">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-400">
          <p>Brian AI - Powered by open-source technologies • Running on Ubuntu • No data collection</p>
        </div>
      </footer>
    </div>
  );
}
