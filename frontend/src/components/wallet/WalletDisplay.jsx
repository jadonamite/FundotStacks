/**
 * Wallet Display Component
 * Shows wallet address and balance
 */

import { useStacksAuth } from '../../hooks/useStacksAuth.js';
import { truncateAddress } from '../../utils/helpers.js';
import { useState } from 'react';

export function WalletDisplay() {
    const { isAuthenticated, stxAddress } = useStacksAuth();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!stxAddress || typeof navigator === 'undefined') return;
        try {
            await navigator.clipboard.writeText(stxAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    if (!isAuthenticated || !stxAddress) {
        return null;
    }

    return (
        <div className="card p-6 space-y-4">
            <h3 className="text-lg font-bold">Your Wallet</h3>
            <div className="space-y-3">
                <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                        Address
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-mono text-sm bg-secondary-100 dark:bg-secondary-800 p-3 rounded-lg break-all">
                            {truncateAddress(stxAddress, 12, 12)}
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="btn btn-outline w-full text-primary-600 dark:text-primary-300"
                            aria-live="polite"
                        >
                            {copied ? 'Copied address!' : 'Copy full address'}
                        </button>
                    </div>
                </div>
                <div>
                    <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">
                        Network
                    </div>
                    <div className="text-sm font-semibold">
                        {import.meta.env.VITE_STACKS_NETWORK === 'mainnet' ? 'Mainnet' : 'Testnet'}
                    </div>
                </div>
            </div>
        </div>
    );
}
