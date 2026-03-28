/**
 * Dashboard Page
 * User's personal dashboard showing backed campaigns and activity
 */

import { useStacksAuth } from '../hooks/useStacksAuth.js';
import { useCampaigns } from '../hooks/useCampaigns.js';
import { Link } from 'react-router-dom';
import { CampaignCard } from '../components/campaign/CampaignCard.jsx';
import { WalletDisplay } from '../components/wallet/WalletDisplay.jsx';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { CampaignSkeletonCard } from '../components/campaign/CampaignSkeletonCard.jsx';
import { ErrorAlert } from '../components/common/ErrorAlert.jsx';

export function Dashboard() {
    const { isAuthenticated, stxAddress } = useStacksAuth();
    const { data: campaigns, isLoading, isError, refetch } = useCampaigns();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="card p-12 text-center max-w-md">
                    <div className="text-6xl mb-4">🔒</div>
                    <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                    <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                        Please connect your Stacks wallet to view your dashboard
                    </p>
                </div>
            </div>
        );
    }

    // Filter campaigns where user is creator or backer
    const myCampaigns = campaigns?.filter(c => c.creator === stxAddress) || [];
    const backedCampaigns = campaigns?.filter(c => c.creator !== stxAddress) || []; // Would need contribution data

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-4">My Dashboard</h1>
                    <p className="text-lg text-secondary-600 dark:text-secondary-400">
                        Manage your campaigns and track your contributions
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* My Campaigns */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2>My Campaigns</h2>
                                <Link to="/create" className="btn btn-primary">
                                    <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Create Campaign
                                </Link>
                            </div>

                        {isError && (
                            <div className="mb-6">
                                <ErrorAlert message="Couldn't load your campaigns. Give it another shot." onRetry={refetch} />
                            </div>
                        )}

                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Array.from({ length: 4 }, (_, index) => (
                                    <CampaignSkeletonCard key={`dashboard-my-skeleton-${index}`} />
                                ))}
                            </div>
                        ) : myCampaigns.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {myCampaigns.map((campaign) => (
                                        <CampaignCard key={campaign.id} campaign={campaign} />
                                    ))}
                                </div>
                            ) : (
                                <div className="card p-12 text-center">
                                    <div className="text-6xl mb-4">🚀</div>
                                    <h3 className="text-xl font-bold mb-2">No Campaigns Yet</h3>
                                    <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                                        Create your first campaign and start raising funds!
                                    </p>
                                    <Link to="/create" className="btn btn-primary">
                                        Create Campaign
                                    </Link>
                                </div>
                            )}
                        </section>

                        {/* Backed Campaigns */}
                        <section>
                            <h2 className="mb-6">Campaigns I'm Backing</h2>
                            {backedCampaigns.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {backedCampaigns.map((campaign) => (
                                        <CampaignCard key={campaign.id} campaign={campaign} />
                                    ))}
                                </div>
                            ) : isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {Array.from({ length: 2 }, (_, index) => (
                                        <CampaignSkeletonCard key={`dashboard-backed-skeleton-${index}`} />
                                    ))}
                                </div>
                            ) : (
                                <div className="card p-12 text-center">
                                    <div className="text-6xl mb-4">💝</div>
                                    <h3 className="text-xl font-bold mb-2">No Backed Campaigns</h3>
                                    <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                                        Start supporting amazing projects!
                                    </p>
                                    <Link to="/explore" className="btn btn-outline">
                                        Explore Campaigns
                                    </Link>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Wallet Info */}
                            <WalletDisplay />

                            {/* Quick Stats */}
                            <div className="card p-6">
                                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                                            Campaigns Created
                                        </div>
                                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                            {myCampaigns.length}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                                            Campaigns Backed
                                        </div>
                                        <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                            0
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
