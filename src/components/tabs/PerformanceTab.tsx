import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, HardDrive, MonitorSmartphone } from 'lucide-react';
import { getSystemMetrics } from '../../lib/metrics';
import type { SystemMetrics } from '../../types';

export function PerformanceTab() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchMetrics() {
      try {
        const data = await getSystemMetrics();
        if (mounted) {
          setMetrics(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch system metrics');
          console.error('Metrics error:', err);
        }
      }
    }

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 2000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const formatMemory = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} GB`;
  };

  const formatPercentage = (value: number) => `${value.toFixed(1)}%`;

  if (error) {
    return (
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
        <div className="text-center text-red-400">
          <Activity className="h-8 w-8 mx-auto mb-4" />
          <p>{error}</p>
          <p className="text-sm mt-2 text-zinc-400">Check if the metrics service is running</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
        <div className="text-center text-zinc-400">
          <Activity className="h-8 w-8 mx-auto mb-4 animate-spin" />
          <p>Loading system metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center space-x-3">
            <Cpu className="h-6 w-6 text-yellow-400" />
            <div className="flex-1">
              <h3 className="font-medium text-white">CPU Usage</h3>
              <div className="mt-2">
                <div className="w-full bg-black rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${metrics.cpu}%` }}
                  />
                </div>
                <p className="text-sm text-zinc-400 mt-1">{formatPercentage(metrics.cpu)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center space-x-3">
            <Database className="h-6 w-6 text-yellow-400" />
            <div className="flex-1">
              <h3 className="font-medium text-white">Memory Usage</h3>
              <div className="mt-2">
                <div className="w-full bg-black rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(metrics.memory.used / metrics.memory.total) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-zinc-400 mt-1">
                  {formatMemory(metrics.memory.used)} / {formatMemory(metrics.memory.total)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center space-x-3">
            <HardDrive className="h-6 w-6 text-yellow-400" />
            <div className="flex-1">
              <h3 className="font-medium text-white">Storage</h3>
              <div className="mt-2">
                <div className="w-full bg-black rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(metrics.storage.used / metrics.storage.total) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-zinc-400 mt-1">
                  {formatMemory(metrics.storage.used)} / {formatMemory(metrics.storage.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {metrics.gpu && (
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center space-x-3 mb-4">
            <MonitorSmartphone className="h-6 w-6 text-yellow-400" />
            <h3 className="text-lg font-medium text-white">GPU - {metrics.gpu.name}</h3>
          </div>
          <div className="grid gap-4">
            <div>
              <h4 className="text-sm font-medium text-zinc-300 mb-2">GPU Memory</h4>
              <div className="w-full bg-black rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(metrics.gpu.memory.used / metrics.gpu.memory.total) * 100}%` }}
                />
              </div>
              <p className="text-sm text-zinc-400 mt-1">
                {formatMemory(metrics.gpu.memory.used)} / {formatMemory(metrics.gpu.memory.total)}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-zinc-300 mb-2">GPU Utilization</h4>
              <div className="w-full bg-black rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${metrics.gpu.utilization}%` }}
                />
              </div>
              <p className="text-sm text-zinc-400 mt-1">{formatPercentage(metrics.gpu.utilization)}</p>
            </div>
          </div>
        </div>
      )}

      {!metrics.gpu && (
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <div className="flex items-center space-x-3">
            <MonitorSmartphone className="h-6 w-6 text-zinc-600" />
            <div>
              <h3 className="text-lg font-medium text-zinc-400">No GPU Detected</h3>
              <p className="text-sm text-zinc-500 mt-1">GPU metrics are not available on this system</p>
            </div>
          </div>
        </div>
      )}

      {metrics.containerLogs && metrics.containerLogs.length > 0 && (
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <h3 className="text-lg font-medium text-white mb-4">Ollama Container Logs</h3>
          <div className="bg-black rounded-lg p-4 font-mono text-sm text-zinc-300 h-48 overflow-y-auto">
            <div className="space-y-2">
              {metrics.containerLogs.map((log, index) => (
                <p key={index}>{log}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}