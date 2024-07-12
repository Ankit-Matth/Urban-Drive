import React from 'react';

const ConfirmationModal = ({ onClose }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-lg mx-auto my-6">
        <div className="bg-white rounded-lg shadow-lg relative flex flex-col p-6">
          <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
          <p className="text-gray-700 text-lg mb-8">
            Your submission has been received successfully. We will contact you soon.
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-center mt-1"
            onClick={onClose}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ConfirmationModal;
