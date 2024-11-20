import React from 'react';
import { Box, Play, Square, Trash2 } from 'lucide-react';

type Container = {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'paused';
  image: string;
  created: string;
};

const mockContainers: Container[] = [
  {
    id: 'abc123',
    name: 'llama2-docker',
    status: 'running',
    image: 'llama2:latest',
    created: '2024-03-10',
  },
  {
    id: 'def456',
    name: 'mistral-docker',
    status: 'stopped',
    image: 'mistral:latest',
    created: '2024-03-09',
  },
];

export function ContainerList() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Containers</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockContainers.map((container) => (
              <tr key={container.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Box className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{container.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${container.status === 'running' ? 'bg-green-100 text-green-800' : 
                      container.status === 'stopped' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {container.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.image}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{container.created}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    {container.status === 'running' ? (
                      <button className="text-yellow-600 hover:text-yellow-900">
                        <Square className="h-5 w-5" />
                      </button>
                    ) : (
                      <button className="text-green-600 hover:text-green-900">
                        <Play className="h-5 w-5" />
                      </button>
                    )}
                    <button className="text-red-600 hover:text-red-900">
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
  );
}