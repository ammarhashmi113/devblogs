// LoadingSpinner.jsx
function LoadingSpinner({ label = "Loading" }) {
    return (
        <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="relative flex flex-col items-center">
                {/* Spinner circle */}
                <div className="w-16 h-16 border-4 border-transparent border-t-indigo-500 border-r-indigo-500 rounded-full animate-spin"></div>

                {/* Pulsing background glow */}
                <div className="absolute w-20 h-20 rounded-full bg-indigo-500/20 blur-2xl animate-ping"></div>

                {/* Label */}
                <span className="mt-6 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
                    {label}
                </span>
            </div>
        </div>
    );
}

export default LoadingSpinner;
