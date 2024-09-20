const API_BASE_URL = 'http://localhost:3001/api';

export async function generateContent(prompt: string): Promise<{ content: string, executionTime: number }> {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate content');
  }

  const data = await response.json();
  return { content: data.content, executionTime: data.executionTime };
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