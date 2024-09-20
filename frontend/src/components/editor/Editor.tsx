'use client';

import React, { useState } from 'react';
import { generateContent, generateShortContent, analyzeContent } from '@/utils/api';

const Editor: React.FC = () => {
  const [inputContent, setInputContent] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (isShort: boolean = false) => {
    setIsLoading(true);
    try {
      const { content, executionTime } = isShort 
        ? await generateShortContent(inputContent)
        : await generateContent(inputContent);
      setGeneratedContent(content);
      console.log(`Content generation took ${executionTime} ms`);
    } catch (error) {
      console.error('Error generating content:', error);
    }
    setIsLoading(false);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const { analysis: analysisResult, executionTime } = await analyzeContent(inputContent);
      setAnalysis(analysisResult);
      console.log(`Content analysis took ${executionTime} ms`);
    } catch (error) {
      console.error('Error analyzing content:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Content Editor</h3>
      <div className="space-y-4">
        <textarea
          rows={10}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Start writing your content here..."
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
        ></textarea>
        <div className="flex space-x-4">
          <button
            onClick={() => handleGenerate()}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Content
          </button>
          <button
            onClick={() => handleGenerate(true)}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Generate Short Content
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Analyze Content
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {generatedContent && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Generated Content:</h4>
            <p className="text-sm text-gray-600">{generatedContent}</p>
          </div>
        )}
        {analysis && (
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-2">Content Analysis:</h4>
            <p className="text-sm text-gray-600">{analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;