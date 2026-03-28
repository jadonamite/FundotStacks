/**
 * Funding Progress Component
 * Visual progress bar for campaign funding
 */

import { formatSTX, calculateProgress } from '../../utils/helpers.js';

export function FundingProgress({ raisedAmount, goalAmount, showDetails = true }) {
    const progress = calculateProgress(raisedAmount, goalAmount);
    const isFullyFunded = progress >= 100;

    return (
        <div className="space-y-3">
            {showDetails && (
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold text-gradient">
                            {formatSTX(raisedAmount)}
                        </div>
                        <div className="text-sm text-secondary-500 dark:text-secondary-400">
                            of {formatSTX(goalAmount)} goal
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                            {progress.toFixed(1)}%
                        </div>
                        <div className="text-xs text-secondary-500 dark:text-secondary-400">
                            funded
                        </div>
                    </div>
                </div>
            )}

            <div
                className="progress-bar h-4"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                aria-label="Funding progress"
            >
                <div
                    className={`progress-fill ${isFullyFunded ? 'glow-effect' : ''}`}
                    style={{ width: `${progress}%` }}
                >
                    {isFullyFunded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">FUNDED</span>
                        </div>
                    )}
                </div>
            </div>

            {isFullyFunded && (
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Campaign Goal Reached!
                </div>
            )}
        </div>
    );
}
