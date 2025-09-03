// src/components/ConfirmationModal.jsx

import { AlertTriangle } from "lucide-react";

const ConfirmationModal = ({ show, message, onCancel, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center gap-2">
                    <AlertTriangle className="text-yellow-500 w-5 h-5" />
                    <h2 className="text-lg font-semibold text-gray-800">
                        Confirm Action
                    </h2>
                </div>

                <div className="px-6 py-5 text-gray-700 text-sm">{message}</div>

                <div className="px-6 py-4 border-t flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
