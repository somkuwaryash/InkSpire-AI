import React from 'react';
import { ContentType } from '@/types/content';

interface ContentTypeSelectorProps {
  selectedType: ContentType;
  onTypeChange: (type: ContentType) => void;
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="contentType" className="block text-sm font-medium text-gray-700">Content Type</label>
      <select
        id="contentType"
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as ContentType)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {Object.values(ContentType).map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1').trim()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ContentTypeSelector;