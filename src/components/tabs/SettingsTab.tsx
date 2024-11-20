import React, { useState, useEffect } from 'react';
import { Database as DatabaseIcon, Server, Terminal, Plus, Trash2, Activity, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { testConnection } from '../../lib/ollama';

type ProjectDB = {
  id: string;
  name: string;
  path: string;
  size: string;
  tables: number;
};

type ConnectionStatus = {
  ok: boolean;
  version?: string;
  error?: string;
};

export function SettingsTab() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [projectDbs, setProjectDbs] = useState<ProjectDB[]>([]);
  const [showNewDb, setShowNewDb] = useState(false);
  const [newDbName, setNewDbName] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:11434');
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    setIsTestingConnection(true);
    const status = await testConnection();
    setConnectionStatus(status);
    setIsTestingConnection(false);
  };

  const handleReconnect = async () => {
    setConnectionStatus(null);
    await checkConnection();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-zinc-900 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Server className="h-6 w-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Ollama Connection</h2>
          </div>
          <div className="flex items-center space-x-3">
            {isTestingConnection ? (
              <Activity className="h-5 w-5 text-yellow-400 animate-spin" />
            ) : connectionStatus?.ok ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : connectionStatus ? (
              <AlertTriangle className="h-5 w-5 text-red-400" />
            ) : null}
            <button
              onClick={handleReconnect}
              disabled={isTestingConnection}
              className="flex items-center space-x-2 px-3 py-1.5 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors text-sm disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isTestingConnection ? 'animate-spin' : ''}`} />
              <span>Reconnect</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">API Endpoint</label>
            <input
              type="text"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="mt-1 block w-full rounded-lg bg-black border-zinc-700 text-white shadow-sm focus:border-yellow-400 focus:ring-yellow-400"
            />
          </div>
          {connectionStatus && (
            <div className={`text-sm ${connectionStatus.ok ? 'text-green-400' : 'text-red-400'}`}>
              {connectionStatus.ok ? (
                `Connected successfully (version ${connectionStatus.version})`
              ) : (
                `Connection failed: ${connectionStatus.error}`
              )}
            </div>
          )}
        </div>
      </div>

      {/* Rest of the settings components remain the same */}
      {/* ... Database settings, CLI, etc. ... */}
    </div>
  );
}