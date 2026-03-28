/**
 * Milestone Tracker Component
 * Displays campaign milestones and their status
 */

export function MilestoneTracker({ milestones = [], campaignId }) {
    if (!milestones || milestones.length === 0) {
        return (
            <div className="card p-6 text-center">
                <p className="text-secondary-600 dark:text-secondary-400">
                    No milestone records have been published for this campaign yet.
                </p>
            </div>
        );
    }

    return (
        <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">Campaign Milestones</h3>
            <p className="mb-6 text-sm text-secondary-600 dark:text-secondary-400">
                These entries are visible progress markers for FundotStacks v1 and do not custody or release funds.
            </p>
            <div className="space-y-4">
                {milestones.map((milestone, index) => (
                    <div key={index} className="relative pl-8 pb-8 last:pb-0">
                        {/* Timeline line */}
                        {index < milestones.length - 1 && (
                            <div className="absolute left-3 top-6 w-0.5 h-full bg-secondary-200 dark:bg-secondary-800"></div>
                        )}

                        {/* Status indicator */}
                        <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${milestone.completed
                                ? 'bg-green-500 border-green-500'
                                : milestone.verified
                                    ? 'bg-blue-500 border-blue-500'
                                    : 'bg-white dark:bg-secondary-900 border-secondary-300 dark:border-secondary-700'
                            }`}>
                            {milestone.completed && (
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>

                        {/* Milestone content */}
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-semibold">Milestone {index + 1}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full ${milestone.completed
                                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                        : milestone.verified
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                            : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
                                    }`}>
                                    {milestone.completed ? 'Released' : milestone.verified ? 'Verified' : 'Pending'}
                                </span>
                            </div>
                            <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-2">
                                {milestone.description}
                            </p>
                            <div className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                                {milestone.percentage}% of funds
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
