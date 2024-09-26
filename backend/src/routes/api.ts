import express from 'express';
import { generateContent, generateShortContent, analyzeContent } from '../services/llmService';
import { projectService } from '../services/projectService';
import { authService } from '../services/authService';
import { ContentGenerationParams } from '../types/content';
import { authenticateUser } from '../middleware/auth';
import { SortOrder } from '../types/common';
import { Project, ProjectStatus } from '../models/Project';

export const router = express.Router();

// Helper function to measure execution time
const measureExecutionTime = async (operation: () => Promise<any>) => {
  const start = Date.now();
  const result = await operation();
  const end = Date.now();
  const executionTime = end - start;
  console.log(`API call took ${executionTime} ms`);
  return { result, executionTime };
};

// Authentication routes
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      // Handle unknown error type
      console.error('Unknown error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ error: error.message });
    } else {
      // Handle unknown error type
      console.error('Unknown error:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

// Protected routes
// router.use(authenticateUser);

router.post('/generate', async (req, res) => {
  try {
    const params: ContentGenerationParams = req.body;
    if (!params.contentType) {
      return res.status(400).json({ error: 'Content type is required' });
    }
    const { result: generatedContent, executionTime } = await measureExecutionTime(() => generateContent(params));
    console.log(`Content generation took ${executionTime} ms`);
    res.status(200).json({ content: generatedContent, executionTime });
  } catch (error) {
    console.error('Error in content generation:', error);
    res.status(500).json({ 
      error: 'An error occurred during content generation', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/generate-short', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const { result: generatedContent, executionTime } = await measureExecutionTime(() => generateShortContent(prompt));
    console.log(`Short content generation took ${executionTime} ms`);
    res.status(200).json({ content: generatedContent, executionTime });
  } catch (error) {
    console.error('Error in short content generation:', error);
    res.status(500).json({ 
      error: 'An error occurred during short content generation', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/analyze', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const { result: analysis, executionTime } = await measureExecutionTime(() => analyzeContent(content));
    console.log(`Content analysis took ${executionTime} ms`);
    res.status(200).json({ analysis, executionTime });
  } catch (error) {
    console.error('Error in content analysis:', error);
    res.status(500).json({ 
      error: 'An error occurred during content analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

router.post('/projects', async (req, res) => {
  try {
    const newProject = await projectService.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

router.get('/projects', async (req, res) => {
  try {

    const {
      page,
      limit,
      sortBy,
      sortOrder,
      status,
      tags
    } = req.query;

    const options = {
      page: page ? parseInt(page as string, 10) :undefined,
      limit: limit ? parseInt(limit as string, 10) :undefined,
      sortBy: sortBy as keyof Project,
      sortOrder: sortOrder as SortOrder,
      status: status as ProjectStatus,
      tags: tags ? (tags as string).split(',') : undefined,
    };

    const { projects, total } = await projectService.getProjects(options);
    res.status(200).json({ projects, total });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const updatedProject = await projectService.updateProject(req.params.id, req.body);
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const deleted = await projectService.softDeleteProject(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

router.post('/projects/:id/archive', async (req, res) => {
  try {
    const project = await projectService.archiveProject(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to archive project' });
  }
});

router.post('/projects/:id/unarchive', async (req, res) => {
  try {
    const project = await projectService.unarchiveProject(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to unarchive project' });
  }
});

router.post('/projects/:id/duplicate', async (req, res) => {
  try {
    const project = await projectService.duplicateProject(req.params.id);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to duplicate project' });
  }
});

router.post('/projects/bulk-update-status', async (req, res) => {
  try {
    const { ids, status } = req.body;
    if (!ids || !Array.isArray(ids) || !status) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const updatedProjects = await projectService.bulkUpdateStatus(ids, status);
    res.status(200).json({ updatedProjects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk update project status' });
  }
});

router.post('/projects/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }
    const deletedProjects = await projectService.bulkDeleteProjects(ids);
    res.status(200).json({ deletedProjects });
  } catch (error) {
    res.status(500).json({ error: 'Failed to bulk delete projects' });
  }
});

