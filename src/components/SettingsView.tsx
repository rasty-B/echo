import React from 'react';
import { Database, Server, Shield } from 'lucide-react';

export function SettingsView() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-6 border">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Connection Settings</h2>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Server className="h-6 w-6 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-700">Ollama Connection</h3>
            </div>
            <div className="ml-9 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">API Endpoint</label>
                <input
                  type="text"
                  defaultValue="http://localhost:11434"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Database className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-700">Vector Databases</h3>
            </div>
            
            <div className="ml-9 space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Chat History DB</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Connection String</label>
                    <input
                      type="text"
                      defaultValue="postgresql://localhost:5432/chat_history"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-700">Project DB</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Connection String</label>
                    <input
                      type="text"
                      defaultValue="postgresql://localhost:5432/project_vectors"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}