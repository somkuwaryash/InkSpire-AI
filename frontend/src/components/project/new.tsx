// src/pages/projects/new.tsx

import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import ProjectForm from '@/components/project/ProjectForm';
import { createProject } from '@/utils/api';
import { Project, ProjectStatus } from '@/models/Project';


const NewProjectPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (projectData: Partial<Project>) => {
    try {
        const newProject = {
            name: projectData.name || '',
            description: projectData.description || '',
            status: projectData.status || ProjectStatus.NOT_STARTED,
            tags: projectData.tags || [],
            collaborators: projectData.collaborators || [],
          };
      await createProject(newProject);
      router.push('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Layout title="Create New Project | InkSpire-AI">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <ProjectForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default NewProjectPage;