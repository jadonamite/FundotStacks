/**
 * Campaign Detail Page
 * Full campaign view with funding interface
 */

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCampaignDetails, useContribution } from '../hooks/useCampaigns.js';
import { useStacksAuth } from '../hooks/useStacksAuth.js';
import { useTransaction } from '../hooks/useTransaction.js';
import { useCampaignMilestones } from '../hooks/useCampaignMilestones.js';
import { fundCampaign } from '../api/contract-calls.js';
import { FundingProgress } from '../components/campaign/FundingProgress.jsx';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { RewardStatus } from '../components/campaign/RewardStatus.jsx';
import { RefundStatus } from '../components/campaign/RefundStatus.jsx';
import { MilestoneTracker } from '../components/campaign/MilestoneTracker.jsx';
import { ErrorAlert } from '../components/common/ErrorAlert.jsx';
import { formatSTX, truncateAddress, getStatusLabel, getStatusColor } from '../utils/helpers.js';

export function CampaignDetail() {
    const { id } = useParams();
    const { data: campaign, isLoading } = useCampaignDetails(id);
    const { isAuthenticated, stxAddress } = useStacksAuth();
    const { submitTransaction, status, error } = useTransaction();
    const [fundAmount, setFundAmount] = useState('');
    const campaignId = Number(id);
    const { data: milestones, isLoading: isMilestonesLoading, isError: milestoneError, refetch: refetchMilestones } = useCampaignMilestones(campaignId);
    const { data: contribution } = useContribution(campaignId, stxAddress);

    const handleFund = async (e) => {
        e.preventDefault();
        if (!fundAmount || parseFloat(fundAmount) <= 0) return;

        try {
            await submitTransaction(fundCampaign, parseInt(id), parseFloat(fundAmount), stxAddress);
            setFundAmount('');
            // Refetch campaign data after successful funding
            window.location.reload();
        } catch (err) {
            console.error('Funding failed:', err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading campaign..." />
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
                    <p className="text-secondary-600 dark:text-secondary-400">
                        This campaign doesn't exist or hasn't been created yet.
                    </p>
                </div>
            </div>
        );
    }

    const statusColor = getStatusColor(campaign.status);
    const statusLabel = getStatusLabel(campaign.status);
    const isActive = campaign.status === 1;

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Breadcrumb */}
                <div className="mb-6 text-sm">
                    <a href="/explore" className="text-primary-500 hover:text-primary-600">← Back to Explore</a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColor}`}>
                                    {statusLabel}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-300">
                                    V1 no-custody
                                </span>
                                {campaign.milestonesEnabled && (
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                                        Milestone Tracking
                                    </span>
                                )}
                            </div>
                            <h1 className="mb-4">{campaign.title}</h1>
                            <div className="flex items-center gap-3 text-secondary-600 dark:text-secondary-400">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                                        {campaign.creator.slice(0, 2)}
                                    </div>
                                    <span className="text-sm">
                                        by <span className="font-semibold">{truncateAddress(campaign.creator, 10, 8)}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold mb-3">About This Campaign</h3>
                            <p className="text-secondary-700 dark:text-secondary-300 whitespace-pre-wrap">
                                {campaign.description}
                            </p>
                        </div>

                        {/* Campaign Details */}
                        <div className="card p-6">
                            <h3 className="text-lg font-bold mb-4">Campaign Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                                        Funding Goal
                                    </div>
                                    <div className="text-lg font-bold">
                                        {formatSTX(campaign.goalAmount)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                                        Deadline
                                    </div>
                                    <div className="text-lg font-bold">
                                        Block {campaign.deadline.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                                        Campaign ID
                                    </div>
                                    <div className="text-lg font-bold">
                                        #{campaign.id}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                                        Created At
                                    </div>
                                    <div className="text-lg font-bold">
                                        Block {campaign.createdAt.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6 bg-secondary-50 dark:bg-secondary-900">
                            <h3 className="text-lg font-bold mb-3">How FundotStacks v1 Works</h3>
                            <div className="space-y-2 text-sm text-secondary-700 dark:text-secondary-300">
                                <p>Backers send STX directly to the creator when they fund a campaign.</p>
                                <p>Campaign, contribution, refund, milestone, and reward data are displayed as on-chain records for transparency.</p>
                                <p>Milestone updates and refunds are coordinated manually in this release rather than enforced through contract custody.</p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-8 space-y-6">
                            {/* Funding Progress */}
                        <FundingProgress
                            raisedAmount={campaign.raisedAmount}
                            goalAmount={campaign.goalAmount}
                        />
                        <RewardStatus
                            campaignId={campaign.id}
                            stxAddress={stxAddress}
                        />

                            {/* Funding Form */}
                            {isActive && (
                                <>
                                    <div className="border-t border-secondary-200 dark:border-secondary-800 pt-6">
                                        <h3 className="text-lg font-bold mb-4">Back This Campaign</h3>
                                        {isAuthenticated ? (
                                            <form onSubmit={handleFund} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-semibold mb-2">
                                                        Amount (STX)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        step="0.000001"
                                                        value={fundAmount}
                                                        onChange={(e) => setFundAmount(e.target.value)}
                                                        placeholder="Enter amount"
                                                        className="input"
                                                        required
                                                    />
                                                </div>

                                                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                                                    Your wallet will send this STX directly to the campaign creator.
                                                </p>

                                                {error && (
                                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
                                                        {error}
                                                    </div>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={status === 'pending' || status === 'confirming'}
                                                    className="btn btn-primary w-full"
                                                >
                                                    {status === 'pending' && 'Awaiting Wallet...'}
                                                    {status === 'confirming' && 'Confirming...'}
                                                    {status === 'idle' && 'Fund Campaign'}
                                                    {status === 'success' && 'Funded!'}
                                                    {status === 'error' && 'Try Again'}
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="text-center py-6">
                                                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                                                    Connect your wallet to fund this campaign
                                                </p>
                                                <button className="btn btn-primary w-full">
                                                    Connect Wallet
                                                </button>
                                            </div>
                                        )}
                                            </div>
                                        </>
                                    )}

                                    {contribution && (
                                        <RefundStatus
                                            campaignId={campaign.id}
                                            backerAddress={stxAddress}
                                            contributionAmount={contribution.amount}
                                        />
                                    )}

                                    {!isActive && (
                                <div className="text-center py-6 bg-secondary-50 dark:bg-secondary-900 rounded-xl">
                                    <p className="text-secondary-600 dark:text-secondary-400 font-semibold">
                                        This campaign is no longer accepting funds
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {campaign.milestonesEnabled && (
                <section className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Milestone Progress</h2>
                        <span className="text-sm text-secondary-500 dark:text-secondary-400">
                            Visible progress records from the Milestone Manager contract
                        </span>
                    </div>

                    {milestoneError && (
                        <div className="mb-4">
                            <ErrorAlert
                                message="Unable to load milestone progress."
                                onRetry={refetchMilestones}
                            />
                        </div>
                    )}

                    {isMilestonesLoading ? (
                        <div className="py-6">
                            <LoadingSpinner size="lg" text="Loading milestones..." />
                        </div>
                    ) : (
                        <MilestoneTracker
                            campaignId={campaign.id}
                            milestones={milestones}
                        />
                    )}
                </section>
            )}
        </div>
    );
}
