// src/components/project/ProjectStatusBadge.tsx

import React from 'react';
import { ProjectStatus } from '@/models/Project';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}


const ProjectStatusBadge: React.FC<ProjectStatusBadgeProps> = ({ status }) => {
    const getStatusColor = () => {
      switch (status) {
        case ProjectStatus.NOT_STARTED:
          return 'bg-gray-100 text-gray-800';
        case ProjectStatus.IN_PROGRESS:
          return 'bg-blue-100 text-blue-800';
        case ProjectStatus.COMPLETED:
          return 'bg-green-100 text-green-800';
        case ProjectStatus.ARCHIVED:
          return 'bg-yellow-100 text-yellow-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
        {status}
      </span>
    );
  };
  
  export default ProjectStatusBadge;