import { LoadingSpinner } from '../common/LoadingSpinner.jsx';
import { ErrorAlert } from '../common/ErrorAlert.jsx';
import { useRefundStatus } from '../../hooks/useRefundStatus.js';

export function RefundStatus({ campaignId, backerAddress, contributionAmount }) {
    const { data, isLoading, isError, refetch } = useRefundStatus(campaignId, backerAddress);

    if (!contributionAmount || !backerAddress) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="mt-4 text-sm card p-4 flex items-center justify-center">
                <LoadingSpinner size="sm" text="Checking refund ledger..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-4">
                <ErrorAlert
                    message="Unable to read refund status."
                    onRetry={refetch}
                />
            </div>
        );
    }

    return (
        <div className="mt-4 card p-4 space-y-2 text-sm text-secondary-700 dark:text-secondary-300">
            {data ? (
                <p className="text-green-700 dark:text-green-300 font-semibold">
                    Your refund has been logged on-chain via the Refund Handler contract.
                </p>
            ) : (
                <p>
                    No refund has been logged yet. In FundotStacks v1, creators coordinate refunds manually and this contract acts as a visible ledger once a refund is recorded.
                </p>
            )}
            <p className="text-xs italic">
                Contribution: {contributionAmount} STX (tracked off-chain data)
            </p>
        </div>
    );
}
