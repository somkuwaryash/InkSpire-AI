import React from 'react';
import Layout from '@/components/layout/Layout';
import ProjectList from '@/components/project/ProjectList';

export default function ProjectsPage() {
  return (
    <Layout title="Projects | InkSpire-AI">
      <ProjectList />
    </Layout>
  );
}