import { ContentFile } from '@/models/Project';

export const exportFormats = ['PDF', 'MARKDOWN', 'TXT'] as const;
export type ExportFormat = typeof exportFormats[number];

export const exportContent = async (content: string, format: ExportFormat, fileName: string) => {
  let fileContent: string;
  let mimeType: string;
  
  switch (format) {
    case 'PDF':
      // For PDF, we'll need to implement PDF generation logic
      // This is a placeholder that creates a simple text file
      fileContent = content;
      mimeType = 'application/pdf';
      break;
    case 'MARKDOWN':
      fileContent = content;
      mimeType = 'text/markdown';
      break;
    case 'TXT':
      fileContent = content;
      mimeType = 'text/plain';
      break;
  }

  const blob = new Blob([fileContent], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.${format.toLowerCase()}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};