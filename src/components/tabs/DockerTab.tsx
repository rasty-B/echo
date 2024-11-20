import React from 'react';
import { Activity, Box, Play, Square, Trash2 } from 'lucide-react';

type Container = {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused';
  image: string;
  cpu: string;
  memory: string;
  uptime: string;
};

const containers: Container[] = [
  {
    id: 'abc123',
    name: 'llama2-docker',
    status: 'running',
    image: 'llama2:latest',
    cpu: '45%',
    memory: '4.2GB',
    uptime: '2d 5h',
  },
  {
    id: 'def456',
    name: 'mistral-docker',
    status: 'stopped',
    image: 'mistral:latest',
    cpu: '0%',
    memory: '0GB',
    uptime: '-',
  },
];

export function DockerTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-yellow-400" />
            <h3 className="font-medium text-white">Active Containers</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-white">2/4</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
          <div className="flex items-center space-x-2">
            <Box className="h-5 w-5 text-yellow-400" />
            <h3 className="font-medium text-white">Total Memory</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-white">8.4GB/16GB</p>
        </div>
        <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-yellow-400" />
            <h3 className="font-medium text-white">CPU Usage</h3>
          </div>
          <p className="text-2xl font-bold mt-2 text-white">45%</p>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Containers</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">CPU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Memory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Uptime</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {containers.map((container) => (
                <tr key={container.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Box className="h-5 w-5 text-zinc-400 mr-2" />
                      <span className="text-sm font-medium text-white">{container.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${container.status === 'running' ? 'bg-green-900 text-green-300' : 
                        container.status === 'stopped' ? 'bg-red-900 text-red-300' : 
                        'bg-yellow-900 text-yellow-300'}`}>
                      {container.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{container.cpu}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{container.memory}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">{container.uptime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {container.status === 'running' ? (
                        <button className="text-yellow-400 hover:text-yellow-300">
                          <Square className="h-5 w-5" />
                        </button>
                      ) : (
                        <button className="text-green-400 hover:text-green-300">
                          <Play className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-red-400 hover:text-red-300">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
        <h2 className="text-lg font-semibold text-white mb-4">Container Logs</h2>
        <div className="bg-black rounded-lg p-4 font-mono text-sm text-zinc-300 h-64 overflow-y-auto">
          <div className="space-y-2">
            <p>[2024-03-10 10:15:32] Starting llama2 container...</p>
            <p>[2024-03-10 10:15:33] Initializing model...</p>
            <p>[2024-03-10 10:15:34] Model loaded successfully</p>
            <p>[2024-03-10 10:15:35] Server listening on port 11434</p>
          </div>
        </div>
      </div>
    </div>
  );
}