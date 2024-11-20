import React, { useState } from 'react';
import { Download, CheckCircle, XCircle } from 'lucide-react';

type Model = {
  name: string;
  context: number;
  parameters: string;
  installed: boolean;
  size: string;
};

const availableModels: Model[] = [
  { name: 'llama2:7b', context: 4096, parameters: '7B', installed: true, size: '4.1GB' },
  { name: 'mistral:7b', context: 8192, parameters: '7B', installed: false, size: '4.3GB' },
  { name: 'nomic-embed-text', context: 8192, parameters: '5B', installed: true, size: '1.5GB' },
];

export function ModelsView() {
  const [pullProgress, setPullProgress] = useState<string | null>(null);

  const handlePull = (modelName: string) => {
    setPullProgress(modelName);
    // Simulate pull progress
    setTimeout(() => setPullProgress(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Available Models</h2>
      </div>

      <div className="grid gap-6">
        {availableModels.map((model) => (
          <div key={model.name} className="bg-white rounded-lg border p-6 flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-800">{model.name}</h3>
                {model.installed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Context Length: {model.context.toLocaleString()} tokens</p>
                <p>Parameters: {model.parameters}</p>
                <p>Size: {model.size}</p>
              </div>
            </div>
            {!model.installed && (
              <button
                onClick={() => handlePull(model.name)}
                disabled={pullProgress === model.name}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <Download className="h-5 w-5" />
                <span>{pullProgress === model.name ? 'Pulling...' : 'Pull Model'}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}