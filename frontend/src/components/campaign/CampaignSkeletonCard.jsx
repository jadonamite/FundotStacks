/**
 * Campaign Skeleton Card
 * Visual placeholder while campaigns load
 */

export function CampaignSkeletonCard() {
    return (
        <div className="card p-6 h-full">
            <div className="flex items-center justify-between mb-4">
                <span className="h-4 w-20 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></span>
                <span className="h-4 w-16 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></span>
            </div>

            <div className="h-6 mb-3 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></div>
            <div className="h-4 mb-4 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></div>
            <div className="h-4 mb-6 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse w-5/6"></div>

            <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></div>
                <span className="h-4 w-32 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></span>
            </div>

            <div className="mb-3">
                <div className="h-2 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse mb-2"></div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '45%' }}></div>
                </div>
            </div>

            <div className="flex justify-between text-sm text-secondary-500 dark:text-secondary-400 mt-3">
                <span className="h-4 w-24 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></span>
                <span className="h-4 w-12 rounded-full bg-secondary-200 dark:bg-secondary-800 animate-pulse"></span>
            </div>
        </div>
    );
}
