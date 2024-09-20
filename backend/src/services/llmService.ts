import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: 'dummy',
  baseURL: process.env.LLM_API_ENDPOINT || 'http://192.168.1.2:1234/v1',
});

export async function generateContent(prompt: string, maxTokens: number = 500): Promise<string> {
  try {
    console.log(`Sending request to LLM with prompt: ${prompt}, maxTokens: ${maxTokens}`);
    const response = await openai.completions.create({
      model: "meta-llama-3.1-8b",
      prompt: prompt,
      max_tokens: maxTokens,
      temperature: 0.7
    });
    console.log('Received response from LLM:', response);
    return response.choices[0].text || 'No content generated';
  } catch (error) {
    console.error('Error in LLM service:', error);
    throw error;
  }
}

export async function generateShortContent(prompt: string): Promise<string> {
  const shortPrompt = `${prompt} (Respond in no more than 100 characters)`;
  return generateContent(shortPrompt, 30); // 30 tokens is approximately 100 characters
}

export async function analyzeContent(content: string): Promise<string> {
  try {
    const prompt = `Analyze the following content and provide feedback:\n\n${content}`;
    const response = await openai.completions.create({
      model: 'meta-llama-3.1-8b',
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.5,
    });

    return response.choices[0].text || 'No analysis generated';
  } catch (error) {
    console.error('Error analyzing content:', error);
    throw error;
  }
}