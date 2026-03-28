/**
 * Contract address helpers
 * Centralizes parsing of Vite env contract identifiers.
 */

const parseIdentifier = (value) => {
    if (!value || typeof value !== 'string') {
        return { address: '', name: '' };
    }

    const [address = '', name = ''] = value.split('.');
    return { address, name };
};

export const CAMPAIGN_CORE = parseIdentifier(import.meta.env.VITE_CAMPAIGN_CORE_ADDRESS || '');
export const MILESTONE_MANAGER = parseIdentifier(import.meta.env.VITE_MILESTONE_MANAGER_ADDRESS || '');
export const NFT_REWARDS = parseIdentifier(import.meta.env.VITE_NFT_REWARDS_ADDRESS || '');
export const REFUND_HANDLER = parseIdentifier(import.meta.env.VITE_REFUND_HANDLER_ADDRESS || '');
