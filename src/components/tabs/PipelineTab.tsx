import React, { useState } from 'react';
import { Plus, Settings, Trash2, FileText } from 'lucide-react';

type Pipeline = {
  id: string;
  name: string;
  description: string;
  prePrompt: string;
  postProcessing: string;
  active: boolean;
};

export function PipelineTab() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [showNewPipeline, setShowNewPipeline] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPipeline, setNewPipeline] = useState({
    name: '',
    description: '',
    prePrompt: '',
    postProcessing: '',
  });

  const handleCreatePipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPipeline.name) return;

    const pipeline: Pipeline = {
      id: Date.now().toString(),
      name: newPipeline.name,
      description: newPipeline.description,
      prePrompt: newPipeline.prePrompt,
      postProcessing: newPipeline.postProcessing,
      active: false,
    };

    setPipelines([...pipelines, pipeline]);
    setNewPipeline({ name: '', description: '', prePrompt: '', postProcessing: '' });
    setShowNewPipeline(false);
  };

  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const handleDeleteConfirm = (id: string) => {
    setPipelines(pipelines.filter(p => p.id !== id));
    setShowDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Processing Pipelines</h2>
        <button
          onClick={() => setShowNewPipeline(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Pipeline</span>
        </button>
      </div>

      {showNewPipeline && (
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <form onSubmit={handleCreatePipeline} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300">Pipeline Name</label>
              <input
                type="text"
                value={newPipeline.name}
                onChange={(e) => setNewPipeline({ ...newPipeline, name: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-black border-zinc-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter pipeline name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Description</label>
              <input
                type="text"
                value={newPipeline.description}
                onChange={(e) => setNewPipeline({ ...newPipeline, description: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-black border-zinc-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Pre-Prompt</label>
              <textarea
                value={newPipeline.prePrompt}
                onChange={(e) => setNewPipeline({ ...newPipeline, prePrompt: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-black border-zinc-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter system prompt to prepend"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Post-Processing</label>
              <textarea
                value={newPipeline.postProcessing}
                onChange={(e) => setNewPipeline({ ...newPipeline, postProcessing: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-black border-zinc-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter post-processing instructions"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewPipeline(false)}
                className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Create Pipeline
              </button>
            </div>
          </form>
        </div>
      )}

      {pipelines.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900 rounded-lg border border-zinc-800">
          <FileText className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No pipelines created yet</p>
          <p className="text-sm text-zinc-500 mt-1">Create a new pipeline to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {pipelines.map((pipeline) => (
            <div key={pipeline.id} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              {/* Pipeline content remains the same */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}