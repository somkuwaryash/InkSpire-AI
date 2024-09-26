import React from 'react';

interface SocialMediaFormProps {
  platform: string;
  goal: string;
  targetAudience: string;
  onPlatformChange: (platform: string) => void;
  onGoalChange: (goal: string) => void;
  onTargetAudienceChange: (targetAudience: string) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({
  platform,
  goal,
  targetAudience,
  onPlatformChange,
  onGoalChange,
  onTargetAudienceChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Platform</label>
        <input
          type="text"
          id="platform"
          value={platform}
          onChange={(e) => onPlatformChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Goal</label>
        <input
          type="text"
          id="goal"
          value={goal}
          onChange={(e) => onGoalChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">Target Audience</label>
        <input
          type="text"
          id="targetAudience"
          value={targetAudience}
          onChange={(e) => onTargetAudienceChange(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default SocialMediaForm;