'use client';

import React, { useState, useEffect } from 'react';
import { getProjectById, updateProject } from '@/utils/api';
import { Project, ContentFile } from '@/models/Project';
import { ContentType } from '@/types/content';
import { v4 as uuidv4 } from 'uuid';

interface ProjectDetailsProps {
  id: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ id }) => {
    const [project, setProject] = useState<Project | null>(null);
    const [editedProject, setEditedProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newContentFile, setNewContentFile] = useState<Partial<ContentFile>>({
      name: '',
      contentType: ContentType.BLOG_POST,
      content: '',
    });
  
    useEffect(() => {
      fetchProject();
    }, [id]);
  
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const fetchedProject = await getProjectById(id);
        setProject(fetchedProject);
        setEditedProject(fetchedProject);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
      setIsLoading(false);
    };
  
    const handleUpdate = async () => {
      if (!editedProject) return;
      setIsLoading(true);
      try {
        const updatedProject = await updateProject(editedProject.id, {
          name: editedProject.name,
          description: editedProject.description,
          contentFiles: editedProject.contentFiles,
        });
        setProject(updatedProject);
        setEditedProject(updatedProject);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating project:', error);
      }
      setIsLoading(false);
    };
  
    const handleAddContentFile = () => {
      if (!editedProject) return;
      const newFile: ContentFile = {
        id: uuidv4(),
        name: newContentFile.name || '',
        contentType: newContentFile.contentType as ContentType,
        content: newContentFile.content || '',
      };
      setEditedProject({
        ...editedProject,
        contentFiles: [...editedProject.contentFiles, newFile],
      });
      setNewContentFile({ name: '', contentType: ContentType.BLOG_POST, content: '' });
    };
  
    const handleUpdateContentFile = (index: number, updatedFile: Partial<ContentFile>) => {
      if (!editedProject) return;
      const updatedFiles = [...editedProject.contentFiles];
      updatedFiles[index] = { ...updatedFiles[index], ...updatedFile };
      setEditedProject({ ...editedProject, contentFiles: updatedFiles });
    };
  
    const handleCancelEdit = () => {
        setEditedProject(JSON.parse(JSON.stringify(project))); // Deep copy
        setIsEditing(false);
      };
  
    if (isLoading) return <p>Loading...</p>;
    if (!project || !editedProject) return <p>Project not found</p>;
  
    return (
      <div className="bg-white shadow sm:rounded-lg p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          {isEditing ? 'Edit Project' : 'Project Details'}
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={editedProject.name}
              onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
              disabled={!isEditing}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={editedProject.description}
              onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>  
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-2">Content Files</h4>
          {project.contentFiles.map((file, index) => (
            <div key={file.id} className="mb-4 p-4 border border-gray-200 rounded-md">
              <input
                type="text"
                value={file.name}
                onChange={(e) => handleUpdateContentFile(index, { name: e.target.value })}
                disabled={!isEditing}
                className="mb-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <select
                value={file.contentType}
                onChange={(e) => handleUpdateContentFile(index, { contentType: e.target.value as ContentType })}
                disabled={!isEditing}
                className="mb-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {Object.values(ContentType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <textarea
                value={file.content}
                onChange={(e) => handleUpdateContentFile(index, { content: e.target.value })}
                disabled={!isEditing}
                rows={5}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
          {isEditing && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Add New Content File</h5>
              <input
                type="text"
                value={newContentFile.name}
                onChange={(e) => setNewContentFile({ ...newContentFile, name: e.target.value })}
                placeholder="File Name"
                className="mb-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <select
                value={newContentFile.contentType}
                onChange={(e) => setNewContentFile({ ...newContentFile, contentType: e.target.value as ContentType })}
                className="mb-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {Object.values(ContentType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <textarea
                value={newContentFile.content}
                onChange={(e) => setNewContentFile({ ...newContentFile, content: e.target.value })}
                placeholder="Content"
                rows={5}
                className="mb-2 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleAddContentFile}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Content File
              </button>
            </div>
          )}
        </div>
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancelEdit}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;