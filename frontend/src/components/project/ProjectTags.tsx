// src/components/project/ProjectTags.tsx

import React from "react";

interface ProjectTagsProps {
  tags: string[];
}

const ProjectTags: React.FC<ProjectTagsProps> = ({ tags }) => {
  return (
    <div className="mt-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mr-1"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default ProjectTags;