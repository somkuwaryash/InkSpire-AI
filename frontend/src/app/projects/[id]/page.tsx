'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import ProjectDetails from '@/components/project/ProjectDetails';

export default function ProjectDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <Layout title="Project Details | InkSpire-AI">
      <ProjectDetails id={id} />
    </Layout>
  );
}