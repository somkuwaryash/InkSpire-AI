// src/pages/projects/[id].tsx

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { getProjectById, archiveProject, unarchiveProject, duplicateProject, deleteProject } from '@/utils/api';
import { Project, ProjectStatus } from '@/models/Project';
import ProjectStatusBadge from '@/components/project/ProjectStatusBadge';
import ProjectTags from '@/components/project/ProjectTags';

const ProjectDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const fetchedProject = await getProjectById(id as string);
      setProject(fetchedProject);
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  const handleArchive = async () => {
    try {
      const updatedProject = await archiveProject(id as string);
      setProject(updatedProject);
    } catch (error) {
      console.error('Error archiving project:', error);
    }
  };

  const handleUnarchive = async () => {
    try {
      const updatedProject = await unarchiveProject(id as string);
      setProject(updatedProject);
    } catch (error) {
      console.error('Error unarchiving project:', error);
    }
  };

  const handleDuplicate = async () => {
    try {
      const duplicatedProject = await duplicateProject(id as string);
      router.push(`/projects/${duplicatedProject.id}`);
    } catch (error) {
      console.error('Error duplicating project:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id as string);
        router.push('/projects');
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <Layout title={`${project.name} | InkSpire-AI`}>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{project.name}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ProjectStatusBadge status={project.status} />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tags</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ProjectTags tags={project.tags} />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Created At</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(project.createdAt).toLocaleString()}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Updated At</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(project.updatedAt).toLocaleString()}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Content Files</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {project.contentFiles.length}
              </dd>
            </div>
          </dl>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            onClick={() => router.push(`/projects/${id}/edit`)}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
          >
            Edit
          </button>
          {project.status !== ProjectStatus.ARCHIVED ? (
            <button
              onClick={handleArchive}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-2"
            >
              Archive
            </button>
          ) : (
            <button
              onClick={handleUnarchive}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-2"
            >
              Unarchive
            </button>
          )}
          <button
            onClick={handleDuplicate}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
          >
            Duplicate
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetailPage;