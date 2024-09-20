import express from 'express';
import { generateContent, generateShortContent, analyzeContent } from '../services/llmService';

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

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    const { result: generatedContent, executionTime } = await measureExecutionTime(() => generateContent(prompt));
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

// Projects route remains the same
router.get('/projects', (req, res) => {
  // TODO: Implement project fetching logic
  res.status(200).json({ message: 'Projects endpoint' });
});