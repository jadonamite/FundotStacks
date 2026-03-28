/**
 * Error Alert / Toast
 * Shows a friendly message plus optional retry
 */

export function ErrorAlert({ message = 'Something went wrong', onRetry = null }) {
    return (
        <div className="card border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/40 text-red-900 dark:text-red-100 p-6 space-y-3">
            <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                <p className="font-semibold text-lg">Uh oh, something broke</p>
            </div>
            <p className="text-sm text-red-700 dark:text-red-200">
                {message}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="btn btn-outline text-red-600 dark:text-red-300"
                >
                    Try again
                </button>
            )}
        </div>
    );
}
