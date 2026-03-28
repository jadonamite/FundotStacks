import { LoadingSpinner } from '../common/LoadingSpinner.jsx';
import { ErrorAlert } from '../common/ErrorAlert.jsx';
import { useBackerNFT } from '../../hooks/useBackerNFT.js';

export function RewardStatus({ campaignId, stxAddress }) {
    const { data, isLoading, isError, refetch } = useBackerNFT(campaignId, stxAddress);

    if (!stxAddress) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="mt-4">
                <LoadingSpinner size="sm" text="Checking NFT rewards..." />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-4">
                <ErrorAlert
                    message="Unable to read your NFT reward status."
                    onRetry={refetch}
                />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="mt-4 card p-4 text-center text-sm text-secondary-600 dark:text-secondary-300">
                No on-chain reward record is linked to your contribution yet.
            </div>
        );
    }

    return (
        <div className="mt-4 card p-4 space-y-2">
            <div className="text-sm font-semibold">Reward Record</div>
            <div className="text-2xl font-bold">Token #{data.tokenId}</div>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">
                FundotStacks v1 surfaces NFT rewards as optional on-chain proof-of-support records.
            </p>
            {data.uri && (
                <a
                    href={data.uri}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary-500 hover:text-primary-600"
                >
                    View metadata
                </a>
            )}
        </div>
    );
}
