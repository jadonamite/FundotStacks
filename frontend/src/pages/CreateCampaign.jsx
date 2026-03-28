/**
 * Create Campaign Page
 * Form page for creating new campaigns
 */

import { useNavigate } from 'react-router-dom';
import { CampaignForm } from '../components/campaign/CampaignForm.jsx';

export function CreateCampaign() {
    const navigate = useNavigate();

    const handleSuccess = () => {
        setTimeout(() => {
            navigate('/explore');
        }, 3000);
    };

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-4">Create a Campaign</h1>
                    <p className="text-lg text-secondary-600 dark:text-secondary-400">
                        Launch your project and start raising funds on Stacks with the FundotStacks v1 direct-to-creator flow.
                    </p>
                </div>

                {/* Info Banner */}
                <div className="card p-6 mb-8 bg-primary-50 dark:bg-primary-950/30 border-primary-200 dark:border-primary-900">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-primary-900 dark:text-primary-100 mb-2">
                                Before You Start
                            </h3>
                            <ul className="text-sm text-primary-800 dark:text-primary-200 space-y-1">
                                <li>• Make sure you have a Stacks wallet connected</li>
                                <li>• Your campaign will be immutable once created</li>
                                <li>• Backing sends STX directly to your wallet, not into contract custody</li>
                                <li>• Refunds and milestone updates are coordinated manually in this v1 release</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="card p-8">
                    <CampaignForm onSuccess={handleSuccess} />
                </div>

                {/* Help Section */}
                <div className="mt-8 text-center text-sm text-secondary-600 dark:text-secondary-400">
                    <p>Need help? Check out our <a href="#" className="text-primary-500 hover:text-primary-600 font-semibold">Campaign Guide</a></p>
                </div>
            </div>
        </div>
    );
}
