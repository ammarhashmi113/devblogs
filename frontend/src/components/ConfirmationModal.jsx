// src/components/ConfirmationModal.jsx

import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ show, message, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 animate-fadeIn">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto overflow-hidden transition-colors duration-300">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                    <AlertTriangle className="text-yellow-500 w-5 h-5" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Confirm Action
                    </h2>
                </div>

                {/* Body */}
                <div className="px-6 py-5 text-gray-700 dark:text-gray-300 text-sm">
                    {message}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
