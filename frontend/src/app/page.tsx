import React from 'react';
import Layout from '@/components/layout/Layout';
import Editor from '@/components/editor/Editor';
import ProjectList from '@/components/project/ProjectList';

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Editor />
        <ProjectList />
      </div>
    </Layout>
  );
}