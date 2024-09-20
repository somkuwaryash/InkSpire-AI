'use client';

import React, { useState } from 'react';

interface Project {
  id: number;
  name: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Blog Post 1', status: 'In Progress' },
    { id: 2, name: 'Marketing Copy', status: 'Completed' },
    { id: 3, name: 'Product Description', status: 'Not Started' },
  ]);

  const [newProjectName, setNewProjectName] = useState('');

  const addProject = () => {
    if (newProjectName.trim()) {
      const newProject: Project = {
        id: projects.length + 1,
        name: newProjectName.trim(),
        status: 'Not Started',
      };
      setProjects([...projects, newProject]);
      setNewProjectName('');
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Projects</h3>
      <div className="mb-4">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
        <button
          onClick={addProject}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Project
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {projects.map((project) => (
          <li key={project.id} className="py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">{project.name}</p>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {project.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;