// src/routes/contentRoutes.ts

import express from 'express';
import { databaseService, ContentType } from '../services/databaseService';
// import { authenticateUser } from '../middleware/auth';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { projectId, name, contentType, content } = req.body;
    const contentFile = await databaseService.createContentFile(projectId, name, contentType as ContentType, content);
    res.status(201).json(contentFile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create content file' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const contentFile = await databaseService.getContentFileById(req.params.id);
    if (!contentFile) {
      return res.status(404).json({ error: 'Content file not found' });
    }
    res.json(contentFile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve content file' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, content } = req.body;
    const updatedContentFile = await databaseService.updateContentFile(req.params.id, { name, content });
    if (!updatedContentFile) {
      return res.status(404).json({ error: 'Content file not found' });
    }
    res.json(updatedContentFile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content file' });
  }
});

router.get('/:id/versions', async (req, res) => {
  try {
    const versions = await databaseService.getContentVersions(req.params.id);
    res.json(versions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve content versions' });
  }
});

export default router;