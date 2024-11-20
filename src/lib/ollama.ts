import { type Message } from '../types';

const OLLAMA_HOST = 'http://localhost:11434';

export async function testConnection(): Promise<{ ok: boolean; version?: string; error?: string }> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/version`);
    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
    const data = await response.json();
    return { ok: true, version: data.version };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function generateResponse(prompt: string, model: string): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

export async function getModels(): Promise<Array<{
  name: string;
  size: number;
  digest: string;
  modified_at: string;
}>> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/tags`);
    if (!response.ok) throw new Error(`Failed to fetch models: ${response.statusText}`);
    const data = await response.json();
    return data.models || [];
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}

export async function pullModel(model: string, onProgress?: (progress: string) => void): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_HOST}/api/pull`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: model }),
    });

    if (!response.ok) throw new Error(`Failed to pull model: ${response.statusText}`);
    
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = new TextDecoder().decode(value);
      const lines = text.split('\n').filter(Boolean);
      
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.status) onProgress?.(data.status);
        } catch {
          // Ignore parse errors
        }
      }
    }

    return true;
  } catch (error) {
    console.error('Error pulling model:', error);
    return false;
  }
}