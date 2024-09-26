// src/components/project/ProjectList.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getProjects, createProject, deleteProject } from '@/utils/api';
import { Project, ProjectStatus } from '@/models/Project';
import { SortOrder } from '@/types/common';
import ProjectStatusBadge from './ProjectStatusBadge';
import ProjectTags from './ProjectTags';

const ITEMS_PER_PAGE = 10;

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<keyof Project>('updatedAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.DESC);
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | ''>('');
  const [tagFilter, setTagFilter] = useState<string>('');
  const [showProjectForm, setShowProjectForm] = useState(false);

  const fetchProjects = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const fetchedProjects = await getProjects({
        page,
        limit: ITEMS_PER_PAGE,
        sortBy,
        sortOrder,
        status: statusFilter || undefined,
        tags: tagFilter ? [tagFilter] : undefined,
      });
      if (fetchedProjects.length > 0) {
        setProjects((prevProjects) => [...prevProjects, ...fetchedProjects]);
        setPage((prevPage) => prevPage + 1);
      }
      setHasMore(fetchedProjects.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setHasMore(false);
    }
    setIsLoading(false);
  }, [page, sortBy, sortOrder, statusFilter, tagFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchProjects();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addProject = async () => {
    if (newProjectName.trim()) {
      setIsLoading(true);
      try {
        const newProject = await createProject({
          name: newProjectName.trim(),
          description: '',
          status: ProjectStatus.NOT_STARTED,
          tags: [],
          collaborators: [],
        });
        setProjects([newProject, ...projects]);
        setNewProjectName('');
      } catch (error) {
        console.error('Error creating project:', error);
      }
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteProject(id);
      setProjects(projects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    setIsLoading(false);
  };

  const handleSort = (newSortBy: keyof Project) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    } else {
      setSortBy(newSortBy);
      setSortOrder(SortOrder.ASC);
    }
    resetList();
  };

  const handleStatusFilter = (status: ProjectStatus | '') => {
    setStatusFilter(status);
    resetList();
  };

  const handleTagFilter = (tag: string) => {
    setTagFilter(tag);
    resetList();
  };

  const resetList = () => {
    setProjects([]);
    setPage(1);
    setHasMore(true);
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
          disabled={isLoading}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Project
        </button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value as ProjectStatus | '')}
            className="mr-2 p-2 border rounded"
          >
            <option value="">All Statuses</option>
            {Object.values(ProjectStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <input
            type="text"
            value={tagFilter}
            onChange={(e) => handleTagFilter(e.target.value)}
            placeholder="Filter by tag"
            className="p-2 border rounded"
          />
        </div>
        <div>
          <button onClick={() => handleSort('name')} className="mr-2">Sort by Name</button>
          <button onClick={() => handleSort('updatedAt')}>Sort by Last Updated</button>
        </div>
      </div>
      <ul className="divide-y divide-gray-200">
        {projects.map((project) => (
          <li key={project.id} className="py-4 flex items-center justify-between">
            <Link href={`/projects/${project.id}`}>
              <div className="cursor-pointer">
                <p className="text-sm font-medium text-gray-900">{project.name}</p>
                <p className="text-sm text-gray-500">{project.description}</p>
                <ProjectStatusBadge status={project.status} />
                <ProjectTags tags={project.tags} />
              </div>
            </Link>
            <button
              onClick={() => handleDeleteProject(project.id)}
              className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default ProjectList;