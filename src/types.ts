export type Message = {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  model?: string;
};

export type Project = {
  id: string;
  name: string;
  description?: string;
  lastModified: string;
  files: number;
};

export type SystemMetrics = {
  cpu: number;
  memory: {
    used: number;
    total: number;
  };
  storage: {
    used: number;
    total: number;
  };
  gpu?: {
    name: string;
    memory: {
      used: number;
      total: number;
    };
    utilization: number;
  };
  containerLogs?: string[];
  timestamp: string;
};