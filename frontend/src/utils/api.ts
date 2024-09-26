import { ContentGenerationParams, GeneratedContent } from '@/types/content';
import { Project } from '@/models/Project';
import { SortOrder } from '@/types/common';
import { ProjectStatus } from '@/models/Project';

const API_BASE_URL = 'http://localhost:3001/api';

let authToken: string | null = null;

const setAuthToken = (token: string) => {
  authToken = token;
};

const clearAuthToken = () => {
  authToken = null;
};

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export async function register(username: string, email: string, password: string): Promise<{ userId: string }> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return response.json();
}

export async function login(email: string, password: string): Promise<{ token: string }> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  setAuthToken(data.token);
  localStorage.setItem('authToken', data.token);
  return data;
}

export function logout() {
  clearAuthToken();
}

// Update existing API calls to include auth headers
export async function generateContent(params: ContentGenerationParams): Promise<{ content: string, executionTime: number }> {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to generate content');
  }

  const data = await response.json();
  return { 
    content: typeof data.content === 'object' ? data.content.content : data.content, 
    executionTime: data.executionTime 
  };
}

export async function generateShortContent(prompt: string): Promise<{ content: string, executionTime: number }> {
  const response = await fetch(`${API_BASE_URL}/generate-short`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate short content');
  }

  const data = await response.json();
  return { content: data.content, executionTime: data.executionTime };
}

export async function analyzeContent(content: string): Promise<{ analysis: string, executionTime: number }> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze content');
  }

  const data = await response.json();
  return { analysis: data.analysis, executionTime: data.executionTime };
}

export async function getProjects(params: {
  page?: number;
  limit?: number;
  sortBy?: keyof Project;
  sortOrder?: SortOrder;
  status?: ProjectStatus;
  tags?: string[];
}): Promise<Project[]> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.sortBy) queryParams.append('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
  if (params.status) queryParams.append('status', params.status);
  if (params.tags) params.tags.forEach(tag => queryParams.append('tags', tag));

  const response = await fetch(`${API_BASE_URL}/projects?${queryParams.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function getProjectById(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }
  return response.json();
}

export async function createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'contentFiles'>): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
}

export async function updateProject(id: string, updateData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error('Failed to update project');
  }
  return response.json();
}

export async function archiveProject(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}/archive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to archive project');
  }
  return response.json();
}

export async function unarchiveProject(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}/unarchive`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to unarchive project');
  }
  return response.json();
}

export async function duplicateProject(id: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}/duplicate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to duplicate project');
  }
  return response.json();
}

// Update the existing deleteProject function to use soft delete
export async function deleteProject(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete project');
  }
}

