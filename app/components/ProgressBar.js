// ProgressBar.js

import React from 'react';

const ProgressBar = ({ progressSteps, currentProgress }) => {
    // Calculate the index of currentProgress in progressSteps array
    const currentStepIndex = progressSteps.findIndex(step => step >= currentProgress);

    // Calculate the percentage of progress based on currentProgress
    const percentage = (currentProgress / 100) * 100;

    // Determine whether to hide the slate circle
    const hideSlateCircle = currentProgress === 100;

    return (
        <div className="flex items-center justify-between mt-4 relative">
            {/* Background bar */}
            <div className="flex-1 h-2 bg-slate-400 absolute left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
            {/* Incomplete progress bar */}
            <div className="flex-1 h-2 bg-indigo-700  absolute left-0 top-1/2 transform -translate-y-1/2" style={{ width: `${percentage}%` }}></div>
            {/* Starting circle */}
            <div className="w-5 h-5 rounded-full bg-indigo-700 flex items-center justify-center absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            {/* Yellow progress circle */}
            <div className="w-6 h-6 rounded-full bg-yellow-300 flex items-center justify-center absolute left-0 top-1/2 transform -translate-y-1/2" style={{ left: `${percentage}%`, marginLeft: '-0.5rem' }}>
                <div className="w-4 h-4 rounded-full shadow-md shadow-amber-700 animate-pulse"></div>
            </div>
            {/* Ending circle */}
            {!hideSlateCircle && (
                <div className="w-5 h-5 rounded-full bg-slate-400 flex items-center justify-center absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
