import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void; // Add this line to handle update
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onUpdate, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-lg">
        {children}
        <div className="flex justify-center mt-4">
          <button
            onClick={onUpdate}
            className="w-auto px-12 py-3 bg-black text-base text-center font-semibold text-white rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="w-auto px-10 py-3 bg-red-600 text-base font-semibold text-white rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
