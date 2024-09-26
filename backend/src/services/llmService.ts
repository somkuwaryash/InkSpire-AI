// import OpenAI from 'openai';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
import { ContentType, promptTemplates } from './promptServices';
import { ContentGenerationParams, GeneratedContent } from '../types/content';


dotenv.config();

// const openai = new OpenAI({
//   apiKey: 'dummy',
//   baseURL: process.env.LLM_API_ENDPOINT || 'http://192.168.1.2:1234/v1',
// });

const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);
const MODEL_ID = process.env.HUGGINGFACE_MODEL_ID || 'meta-llama/Meta-Llama-3-70B-Instruct';

export async function generateContent(params: ContentGenerationParams): Promise<GeneratedContent> {
  try {
    const { contentType, ...templateParams } = params;
    
    const prompt = promptTemplates[contentType](templateParams as any);

    console.log(`Sending request to Hugging Face with prompt: ${prompt}`);
    const response = await hf.textGeneration({
      model: MODEL_ID,
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
      },
    });
    
    const generatedContent = response.generated_text || 'No content generated';
    console.log('Received response from Hugging Face:', response);
    
    const contentId = Math.random().toString(36).substr(2, 9);
    const result: GeneratedContent = {
      id: contentId,
      content: generatedContent,
      contentType,
      createdAt: new Date(),
    };

    return result;
  } catch (error) {
    console.error('Error in Hugging Face service:', error);
    throw new Error('Failed to generate content using Hugging Face API');
  }
}

export async function generateShortContent(prompt: string): Promise<GeneratedContent> {
  return generateContent({
    contentType: ContentType.SOCIAL_MEDIA,
    platform: 'generic',
    goal: `Respond in no more than 100 characters to the following: ${prompt}`,
    targetAudience: 'general'
  });
}

export async function analyzeContent(content: string): Promise<string> {
  try {
    const prompt = `Analyze the following content and provide feedback:\n\n${content}`;
    const response = await hf.textGeneration({
      model: MODEL_ID,
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.5,
      },
    });

    return response.generated_text || 'No analysis generated';
  } catch (error) {
    console.error('Error analyzing content:', error);
    throw new Error('Failed to analyze content using Hugging Face API');
  }
}


// export async function generateContent(prompt: string, maxTokens: number = 500): Promise<string> {
//   try {
//     console.log(`Sending request to LLM with prompt: ${prompt}, maxTokens: ${maxTokens}`);
//     const response = await openai.completions.create({
//       model: "meta-llama-3.1-8b",
//       prompt: prompt,
//       max_tokens: maxTokens,
//       temperature: 0.7
//     });
//     console.log('Received response from LLM:', response);
//     return response.choices[0].text || 'No content generated';
//   } catch (error) {
//     console.error('Error in LLM service:', error);
//     throw error;
//   }
// }

// export async function generateShortContent(prompt: string): Promise<string> {
//   const shortPrompt = `${prompt} (Respond in no more than 100 characters)`;
//   return generateContent(shortPrompt, 30); // 30 tokens is approximately 100 characters
// }

// export async function analyzeContent(content: string): Promise<string> {
//   try {
//     const prompt = `Analyze the following content and provide feedback:\n\n${content}`;
//     const response = await openai.completions.create({
//       model: 'meta-llama-3.1-8b',
//       prompt: prompt,
//       max_tokens: 500,
//       temperature: 0.5,
//     });

//     return response.choices[0].text || 'No analysis generated';
//   } catch (error) {
//     console.error('Error analyzing content:', error);
//     throw error;
//   }
// }