// src/components/seo/SEOPage.tsx

' use client '

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';

const SEO: React.FC = () => {
  const [content, setContent] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleAnalyze = () => {
    // This function will be implemented later
    console.log('Analyzing content...');
  };

  return (
    <Layout title="SEO Analysis | InkSpire-AI">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">SEO Analysis</h1>
        
        <div className="bg-white shadow sm:rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content to Analyze
            </label>
            <textarea
              id="content"
              rows={6}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content here..."
            />
          </div>

          <div className="mb-4">
            <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
              Target Keywords (comma-separated)
            </label>
            <input
              type="text"
              id="keywords"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., SEO, content optimization, keyword analysis"
            />
          </div>

          <button
            onClick={handleAnalyze}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Analyze Content
          </button>

          {/* Results section (to be implemented) */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Results</h2>
            {/* Results will be displayed here */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SEO;