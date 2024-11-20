import React, { useState } from 'react';
import { Plus, Folder, Settings, Trash2 } from 'lucide-react';

type Project = {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  files: number;
};

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name) return;

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      lastModified: new Date().toISOString().split('T')[0],
      files: 0,
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', description: '' });
    setShowNewProject(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <button
          onClick={() => setShowNewProject(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>

      {showNewProject && (
        <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300">Project Name</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-black border-zinc-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="mt-1 block w-full rounded-lg bg-black border-zinc-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Enter project description"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewProject(false)}
                className="px-4 py-2 text-zinc-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-zinc-900 rounded-lg border border-zinc-800">
          <Folder className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No projects created yet</p>
          <p className="text-sm text-zinc-500 mt-1">Create a new project to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Folder className="h-6 w-6 text-yellow-400" />
                  <div>
                    <h3 className="text-lg font-medium text-white">{project.name}</h3>
                    <p className="text-sm text-zinc-400">{project.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-zinc-400 hover:text-white transition-colors">
                    <Settings className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-zinc-400 hover:text-red-400 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-4 text-sm text-zinc-400">
                <span>Last modified: {project.lastModified}</span>
                <span>{project.files} files</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}