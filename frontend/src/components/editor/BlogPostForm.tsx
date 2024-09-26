import React from 'react';

interface BlogPostFormProps {
  topic: string;
  keywords: string[];
  onTopicChange: (topic: string) => void;
  onKeywordsChange: (keywords: string[]) => void;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({ topic, keywords, onTopicChange, onKeywordsChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">Keywords (comma-separated)</label>
        <input
          type="text"
          id="keywords"
          value={keywords.join(', ')}
          onChange={(e) => onKeywordsChange(e.target.value.split(',').map(k => k.trim()))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default BlogPostForm;