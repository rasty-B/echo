import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, XCircle, Activity, AlertTriangle } from 'lucide-react';
import { testConnection, getModels, pullModel } from '../../lib/ollama';

type ConnectionStatus = {
  ok: boolean;
  version?: string;
  error?: string;
};

type Model = {
  name: string;
  size: number;
  digest: string;
  modified_at: string;
  status: 'ready' | 'pulling' | 'not-installed';
  pullProgress?: string;
};

export function ModelsTab() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pullStatus, setPullStatus] = useState<Record<string, string>>({});

  const checkConnection = async () => {
    const status = await testConnection();
    setConnectionStatus(status);
    return status.ok;
  };

  const loadModels = async () => {
    setIsLoading(true);
    try {
      const availableModels = await getModels();
      setModels(availableModels.map(model => ({
        ...model,
        status: 'ready',
      })));
    } catch (error) {
      console.error('Failed to load models:', error);
      setModels([{
        name: 'llama2:7b',
        size: 0,
        digest: 'fallback',
        modified_at: new Date().toISOString(),
        status: 'not-installed',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const isConnected = await checkConnection();
      if (isConnected) {
        await loadModels();
      }
    };
    init();
  }, []);

  const handlePull = async (modelName: string) => {
    setPullStatus(prev => ({ ...prev, [modelName]: 'Starting download...' }));
    
    try {
      const success = await pullModel(modelName, (progress) => {
        setPullStatus(prev => ({ ...prev, [modelName]: progress }));
      });

      if (success) {
        await loadModels();
      }
    } catch (error) {
      console.error('Failed to pull model:', error);
      setPullStatus(prev => ({ ...prev, [modelName]: 'Failed to pull model' }));
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
        <div className="flex items-center space-x-3">
          {connectionStatus === null ? (
            <Activity className="h-5 w-5 text-yellow-400 animate-spin" />
          ) : connectionStatus.ok ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-400" />
          )}
          <div>
            <h3 className="font-medium text-white">Ollama Connection Status</h3>
            <p className="text-sm text-zinc-400">
              {connectionStatus === null ? 'Checking connection...' :
               connectionStatus.ok ? `Connected (v${connectionStatus.version})` :
               `Connection failed: ${connectionStatus.error}`}
            </p>
          </div>
          {!connectionStatus?.ok && (
            <button
              onClick={checkConnection}
              className="ml-auto px-3 py-1.5 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors text-sm"
            >
              Retry Connection
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">
            <Activity className="h-8 w-8 text-yellow-400 animate-spin mx-auto" />
            <p className="mt-2 text-zinc-400">Loading models...</p>
          </div>
        ) : models.map((model) => (
          <div key={model.name} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                  {model.status === 'ready' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : model.status === 'pulling' ? (
                    <Activity className="h-5 w-5 text-yellow-400 animate-spin" />
                  ) : (
                    <XCircle className="h-5 w-5 text-zinc-400" />
                  )}
                </div>
                <div className="text-sm text-zinc-400 space-y-1">
                  <p>Size: {formatSize(model.size)}</p>
                  <p>Last Modified: {new Date(model.modified_at).toLocaleString()}</p>
                  {pullStatus[model.name] && (
                    <p className="text-yellow-400">{pullStatus[model.name]}</p>
                  )}
                </div>
              </div>
              {model.status !== 'ready' && (
                <button
                  onClick={() => handlePull(model.name)}
                  disabled={!!pullStatus[model.name]}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50"
                >
                  <Download className="h-5 w-5" />
                  <span>{pullStatus[model.name] ? 'Pulling...' : 'Pull Model'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}