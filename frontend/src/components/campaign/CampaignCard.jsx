/**
 * Campaign Card Component
 * Displays campaign preview with funding progress
 */

import { Link } from 'react-router-dom';
import { formatSTX, calculateProgress, getStatusLabel, getStatusColor, truncateAddress } from '../../utils/helpers.js';

export function CampaignCard({ campaign }) {
    const progress = calculateProgress(campaign.raisedAmount, campaign.goalAmount);
    const statusColor = getStatusColor(campaign.status);
    const statusLabel = getStatusLabel(campaign.status);
    const label = `View details for ${campaign.title || 'this campaign'}`;

    return (
        <Link
            to={`/campaign/${campaign.id}`}
            aria-label={label}
            title={label}
        >
            <div className="card card-hover p-6 h-full flex flex-col">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColor}`}>
                        {statusLabel}
                    </span>
                    {campaign.milestonesEnabled && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                            Milestones
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary-500 transition-colors">
                    {campaign.title}
                </h3>

                {/* Description */}
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {campaign.description}
                </p>

                {/* Creator */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                        {campaign.creator.slice(0, 2)}
                    </div>
                    <span className="text-secondary-600 dark:text-secondary-400">
                        by {truncateAddress(campaign.creator, 8, 6)}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                            {formatSTX(campaign.raisedAmount)}
                        </span>
                        <span className="text-secondary-500 dark:text-secondary-400">
                            {progress.toFixed(0)}%
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                        Goal: {formatSTX(campaign.goalAmount)}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-secondary-200 dark:border-secondary-800">
                    <div className="text-sm">
                        <span className="text-secondary-500 dark:text-secondary-400">Deadline:</span>
                        <span className="ml-1 font-semibold">Block {campaign.deadline.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
