import React from 'react';
import { Cpu, HardDrive, Database } from 'lucide-react';

export function SystemMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <Cpu className="h-8 w-8 text-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">CPU Usage</h3>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">45%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <Database className="h-8 w-8 text-green-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Memory Usage</h3>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">8GB / 16GB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3">
          <HardDrive className="h-8 w-8 text-purple-500" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Disk Space</h3>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">75GB / 100GB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}