import React, { useState } from 'react';
import { ContentFile } from '@/models/Project';
import { exportContent, ExportFormat, exportFormats } from '@/utils/export';

interface ExportContentProps {
  contentFile: ContentFile;
}

const ExportContent: React.FC<ExportContentProps> = ({ contentFile }) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('MARKDOWN');

  const handleExport = async () => {
    try {
      await exportContent(contentFile.content, selectedFormat, contentFile.name);
    } catch (error) {
      console.error('Error exporting content:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value as ExportFormat)}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm"
      >
        {exportFormats.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>
      <button
        onClick={handleExport}
        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Export
      </button>
    </div>
  );
};

export default ExportContent;