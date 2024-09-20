import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Welcome to InkSpire-AI. Your content creation journey starts here.</p>
        </div>
        {/* Add more dashboard content here */}
      </div>
    </div>
  );
};

export default Dashboard;