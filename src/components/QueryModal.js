import React from 'react';

const QueryModal = ({ query, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">{query.subject}</h2>
            <button className="text-blue-500 hover:underline" onClick={onClose}>
              Close
            </button>
          </div>
          <p className="text-gray-700 mb-4">{query.description}</p>
          {query.file && (
            <div className="mb-4">
              <img src={query.file} alt="Screenshot" className="w-full rounded-lg" />
            </div>
          )}
          <p className="text-gray-600">From: {query.name} ({query.email})</p>
        </div>
      </div>
    </div>
  );
};

export default QueryModal;
