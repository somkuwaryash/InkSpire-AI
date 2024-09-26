import React from 'react';

interface EmailNewsletterFormProps {
  subject: string;
  keyPoints: string[];
  audience: string;
  onSubjectChange: (subject: string) => void;
  onKeyPointsChange: (keyPoints: string[]) => void;
  onAudienceChange: (audience: string) => void;
}

const EmailNewsletterForm: React.FC<EmailNewsletterFormProps> = ({
  subject,
  keyPoints,
  audience,
  onSubjectChange,
  onKeyPointsChange,
  onAudienceChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="keyPoints" className="block text-sm font-medium text-gray-700">Key Points (comma-separated)</label>
        <input
          type="text"
          id="keyPoints"
          value={keyPoints.join(', ')}
          onChange={(e) => onKeyPointsChange(e.target.value.split(',').map(k => k.trim()))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="audience" className="block text-sm font-medium text-gray-700">Target Audience</label>
        <input
          type="text"
          id="audience"
          value={audience}
          onChange={(e) => onAudienceChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default EmailNewsletterForm;