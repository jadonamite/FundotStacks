import { useQuery } from '@tanstack/react-query';
import { getBackerNFT, getTokenURI } from '../api/nft-rewards.js';

export function useBackerNFT(campaignId, backerAddress) {
    return useQuery({
        queryKey: ['backer-nft', campaignId, backerAddress],
        queryFn: async () => {
            const tokenId = await getBackerNFT(campaignId, backerAddress);
            if (!tokenId) return null;
            const uri = await getTokenURI(tokenId);
            return { tokenId, uri };
        },
        enabled: !!campaignId && !!backerAddress,
        staleTime: 60000
    });
}
