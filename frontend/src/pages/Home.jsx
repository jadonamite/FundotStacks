/**
 * Home Page Component
 * Landing page with hero and featured campaigns
 */

import { Link } from 'react-router-dom';
import { useCampaigns } from '../hooks/useCampaigns.js';
import { CampaignCard } from '../components/campaign/CampaignCard.jsx';
import { LoadingSpinner } from '../components/common/LoadingSpinner.jsx';
import { CampaignSkeletonCard } from '../components/campaign/CampaignSkeletonCard.jsx';

export function Home() {
    const { data: campaigns, isLoading } = useCampaigns();

    const featuredCampaigns = campaigns?.slice(0, 3) || [];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 py-20 md:py-32">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="mb-6 text-gradient">
                            Decentralized Crowdfunding on Bitcoin
                        </h1>
                        <p className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto">
                            Launch campaigns, raise funds, and build the future with the security of Bitcoin through Stacks blockchain
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/create" className="btn btn-primary text-lg px-8 py-4">
                                <svg className="w-6 h-6 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Start a Campaign
                            </Link>
                            <Link to="/explore" className="btn btn-outline text-lg px-8 py-4">
                                Explore Projects
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-primary-400 dark:bg-primary-800 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </section>

            {/* Stats Section */}
            <section className="py-16 border-b border-secondary-200 dark:border-secondary-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                                {campaigns?.length || 0}
                            </div>
                            <div className="text-secondary-600 dark:text-secondary-400 font-medium">
                                Active Campaigns
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                                100%
                            </div>
                            <div className="text-secondary-600 dark:text-secondary-400 font-medium">
                                Secured by Bitcoin
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                                $0
                            </div>
                            <div className="text-secondary-600 dark:text-secondary-400 font-medium">
                                Platform Fees
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Campaigns */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2>Featured Campaigns</h2>
                        <Link to="/explore" className="text-primary-500 hover:text-primary-600 font-semibold flex items-center gap-2">
                            View All
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }, (_, index) => (
                                <CampaignSkeletonCard key={`skeleton-${index}`} />
                            ))}
                        </div>
                    ) : featuredCampaigns.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredCampaigns.map((campaign) => (
                                <CampaignCard key={campaign.id} campaign={campaign} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🚀</div>
                            <h3 className="text-2xl font-bold mb-2">No Campaigns Yet</h3>
                            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                                Be the first to create a  campaign on FundotStacks!
                            </p>
                            <Link to="/create" className="btn btn-primary">
                                Create Campaign
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-secondary-50 dark:bg-secondary-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-center mb-12">Why FundotStacks?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="card p-6 text-center">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Bitcoin Secured</h3>
                            <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                All transactions secured by Bitcoin's Proof of Work
                            </p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Smart Contracts</h3>
                            <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                Automated fund releases with Clarity smart contracts
                            </p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Milestone Funding</h3>
                            <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                Release funds in stages as you hit project milestones
                            </p>
                        </div>

                        <div className="card p-6 text-center">
                            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2">Zero Fees</h3>
                            <p className="text-sm text-secondary-600 dark:text-secondary-400">
                                No platform fees, only blockchain transaction costs
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
