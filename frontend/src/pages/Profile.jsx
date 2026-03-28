/**
 * Profile Page
 * User profile showing campaigns and contributions
 */

import { useParams } from 'react-router-dom';
import { useCampaigns } from '../hooks/useCampaigns.js';
import { CampaignCard } from '../components/campaign/CampaignCard.jsx';
import { CampaignSkeletonCard } from '../components/campaign/CampaignSkeletonCard.jsx';
import { ErrorAlert } from '../components/common/ErrorAlert.jsx';
import { truncateAddress } from '../utils/helpers.js';

export function Profile() {
    const { address } = useParams();
    const { data: campaigns, isLoading, isError, refetch } = useCampaigns();

    // Filter campaigns by creator address
    const userCampaigns = campaigns?.filter(c => c.creator === address) || [];

    if (isLoading) {
        return (
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 4 }, (_, index) => (
                            <CampaignSkeletonCard key={`profile-skeleton-${index}`} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Profile Header */}
                <div className="card p-8 mb-8">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                            {address.slice(0, 2)}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h1 className="mb-2">Creator Profile</h1>
                            <div className="flex items-center gap-4 text-secondary-600 dark:text-secondary-400">
                                <span className="font-mono text-sm bg-secondary-100 dark:bg-secondary-800 px-3 py-1 rounded-lg">
                                    {truncateAddress(address, 12, 10)}
                                </span>
                                <button
                                    onClick={() => navigator.clipboard.writeText(address)}
                                    className="text-primary-500 hover:text-primary-600 text-sm font-semibold"
                                >
                                    Copy Address
                                </button>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden md:flex gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                                    {userCampaigns.length}
                                </div>
                                <div className="text-sm text-secondary-600 dark:text-secondary-400">
                                    Campaigns
                                </div>
                            </div>
                            {/* Could add more stats like total raised, backers, etc */}
                        </div>
                    </div>
                </div>

                {/* Campaigns */}
            <div className="mb-6">
                <h2>Campaigns by This Creator</h2>
            </div>

            {isError && (
                <div className="mb-6">
                    <ErrorAlert
                        message="Unable to load campaigns for this creator. Try again."
                        onRetry={refetch}
                    />
                </div>
            )}

            {userCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userCampaigns.map((campaign) => (
                            <CampaignCard key={campaign.id} campaign={campaign} />
                        ))}
                    </div>
                ) : (
                    <div className="card p-12 text-center">
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-2xl font-bold mb-2">No Campaigns Yet</h3>
                        <p className="text-secondary-600 dark:text-secondary-400">
                            This creator hasn't launched any campaigns on FundotStacks
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
