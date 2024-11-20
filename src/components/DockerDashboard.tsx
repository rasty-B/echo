import React from 'react';
import { ContainerList } from './ContainerList';
import { SystemMetrics } from './SystemMetrics';

export function DockerDashboard() {
  return (
    <div className="space-y-8">
      <SystemMetrics />
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Container Logs</h2>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 h-64 overflow-y-auto">
          <div className="space-y-2">
            <p>[2024-03-10 10:15:32] Starting llama2 container...</p>
            <p>[2024-03-10 10:15:33] Initializing model...</p>
            <p>[2024-03-10 10:15:34] Model loaded successfully</p>
            <p>[2024-03-10 10:15:35] Server listening on port 11434</p>
          </div>
        </div>
      </div>

      <ContainerList />
    </div>
  );
}