import React from 'react';

interface PressReleaseFormProps {
  announcement: string;
  companyInfo: string;
  quotes: string[];
  onAnnouncementChange: (announcement: string) => void;
  onCompanyInfoChange: (companyInfo: string) => void;
  onQuotesChange: (quotes: string[]) => void;
}

const PressReleaseForm: React.FC<PressReleaseFormProps> = ({
  announcement,
  companyInfo,
  quotes,
  onAnnouncementChange,
  onCompanyInfoChange,
  onQuotesChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="announcement" className="block text-sm font-medium text-gray-700">Announcement</label>
        <textarea
          id="announcement"
          value={announcement}
          onChange={(e) => onAnnouncementChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={3}
        />
      </div>
      <div>
        <label htmlFor="companyInfo" className="block text-sm font-medium text-gray-700">Company Information</label>
        <textarea
          id="companyInfo"
          value={companyInfo}
          onChange={(e) => onCompanyInfoChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={3}
        />
      </div>
      <div>
        <label htmlFor="quotes" className="block text-sm font-medium text-gray-700">Quotes (one per line)</label>
        <textarea
          id="quotes"
          value={quotes.join('\n')}
          onChange={(e) => onQuotesChange(e.target.value.split('\n').filter(q => q.trim() !== ''))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          rows={3}
        />
      </div>
    </div>
  );
};

export default PressReleaseForm;