/**
 * Explore Campaigns Page
 * Browse and filter all campaigns
 */

import { useState } from 'react';
import { useCampaigns } from '../hooks/useCampaigns.js';
import { useCampaignStore } from '../store/campaignStore.js';
import { CampaignCard } from '../components/campaign/CampaignCard.jsx';
import { CampaignSkeletonCard } from '../components/campaign/CampaignSkeletonCard.jsx';

export function ExploreCampaigns() {
    const { isLoading } = useCampaigns();
    const { filters, setFilters, getFilteredCampaigns } = useCampaignStore();

    const filteredCampaigns = getFilteredCampaigns();

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-4">Explore Campaigns</h1>
                    <p className="text-lg text-secondary-600 dark:text-secondary-400">
                        Discover and support innovative projects on Stacks
                    </p>
                </div>

                {/* Filters */}
                <div className="card p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Status Filter */}
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-2">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters({ status: e.target.value })}
                                className="input"
                            >
                                <option value="all">All Campaigns</option>
                                <option value="active">Active</option>
                                <option value="funded">Funded</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Sort Filter */}
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-2">
                                Sort By
                            </label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => setFilters({ sortBy: e.target.value })}
                                className="input"
                            >
                                <option value="recent">Most Recent</option>
                                <option value="ending-soon">Ending Soon</option>
                                <option value="most-funded">Most Funded</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Campaign Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }, (_, index) => (
                            <CampaignSkeletonCard key={`explore-skeleton-${index}`} />
                        ))}
                    </div>
                ) : filteredCampaigns.length > 0 ? (
                    <>
                        <div className="mb-4 text-sm text-secondary-600 dark:text-secondary-400">
                            Showing {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCampaigns.map((campaign) => (
                                <CampaignCard key={campaign.id} campaign={campaign} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-16 card p-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2">No Campaigns Found</h3>
                        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                            Try adjusting your filters or check back later for new campaigns
                        </p>
                        <button
                            onClick={() => setFilters({ status: 'all', sortBy: 'recent' })}
                            className="btn btn-outline"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
