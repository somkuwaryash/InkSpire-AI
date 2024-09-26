import { v4 as uuidv4 } from 'uuid';
import { Project, ContentFile, ProjectStatus } from '../models/Project';
import { SortOrder } from '../types/common';

interface GetProjectsOptions {
  page?: number;
  limit?: number;
  sortBy?: keyof Project;
  sortOrder?: SortOrder;
  status?: ProjectStatus;
  tags?: string[];
}

class ProjectService {
    private projects: Project[] = [];
  
    async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'contentFiles' | 'tags' | 'status' | 'collaborators'>): Promise<Project> {
      const newProject: Project = {
        ...projectData,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        contentFiles: [],
        tags: [],
        status: ProjectStatus.NOT_STARTED,
        collaborators: [],
      };
      this.projects.push(newProject);
      return newProject;
    }

  async getProjects(options: GetProjectsOptions = {}): Promise<{ projects: Project[], total: number }> {
    let filteredProjects = this.projects;

    // apply filters
    if (options.status) {
      filteredProjects = filteredProjects.filter(project => project.status === options.status);
    }
    if (options.tags && options.tags.length > 0) {
      filteredProjects = filteredProjects.filter(project => 
        options.tags!.some(tag => project.tags.includes(tag))
      );
    }

    // apply sorting
if (options.sortBy && options.sortOrder) {
      filteredProjects.sort((a, b) => {
        if (a[options.sortBy!] < b[options.sortBy!]) {
          return options.sortOrder === SortOrder.ASC ? -1 : 1;
        }
        if (a[options.sortBy!] > b[options.sortBy!]) {
          return options.sortOrder === SortOrder.ASC ? 1 : -1;
        }
        return 0;
      });
    }

    // apply pagination
    const page = options.page || 1;
    const limit = options.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return {
      projects: paginatedProjects,
      total: filteredProjects.length,
    };
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return this.projects.find(project => project.id === id);
  }

  async updateProject(id: string, updateData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | undefined> {
    const projectIndex = this.projects.findIndex(project => project.id === id);
    if (projectIndex === -1) return undefined;

    const updatedProject = {
      ...this.projects[projectIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    this.projects[projectIndex] = updatedProject;
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    const initialLength = this.projects.length;
    this.projects = this.projects.filter(project => project.id !== id);
    return this.projects.length < initialLength;
  }

  async softDeleteProject(id: string): Promise<Project | undefined>{
    return this.updateProject(id, { status: ProjectStatus.ARCHIVED });
  }

  async archiveProject(id: string): Promise<Project | undefined> {
    return this.updateProject(id, { status: ProjectStatus.ARCHIVED });
  }

  async unarchiveProject(id: string): Promise<Project | undefined> {
    return this.updateProject(id, { status: ProjectStatus.IN_PROGRESS });
  }

  async duplicateProject(id: string): Promise<Project | undefined> {
    const projectToDuplicate = await this.getProjectById(id);
    if (!projectToDuplicate) return undefined;

    const duplicatedProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
      ...projectToDuplicate,
      name: `Copy of ${projectToDuplicate.name}`,
      status: ProjectStatus.NOT_STARTED,
    };

    return this.createProject(duplicatedProject);
  }

  async bulkUpdateStatus(ids: string[], status: ProjectStatus): Promise<Project[]> {
    const updatedProjects = [];
    for (const id of ids) {
      const updatedProject = await this.updateProject(id, { status });
      if (updatedProject) {
        updatedProjects.push(updatedProject);
      }
    }
    return updatedProjects;
  }

  async bulkDeleteProjects(ids: string[]): Promise<Project[]> {
    const deletedProjects = [];
    for (const id of ids) {
      const deletedProject = await this.softDeleteProject(id);
      if (deletedProject) {
        deletedProjects.push(deletedProject);
      }
    }
    return deletedProjects;
  }

}

export const projectService = new ProjectService();