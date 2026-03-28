/**
 * Custom Hook - Campaign Data Fetching
 * Uses React Query for efficient caching and updates
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCampaigns, getCampaignDetails, getContribution } from '../api/queries.js';
import { useCampaignStore } from '../store/campaignStore.js';

export function useCampaigns() {
    const { setCampaigns } = useCampaignStore();

    return useQuery({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const campaigns = await getAllCampaigns();
            setCampaigns(campaigns);
            return campaigns;
        },
        staleTime: 30000, // 30 seconds
        refetchInterval: 60000, // Refresh every minute
        retry: 2
    });
}

export function useCampaignDetails(campaignId) {
    return useQuery({
        queryKey: ['campaign', campaignId],
        queryFn: () => getCampaignDetails(campaignId),
        enabled: !!campaignId,
        staleTime: 15000
    });
}

export function useContribution(campaignId, backerAddress) {
    return useQuery({
        queryKey: ['contribution', campaignId, backerAddress],
        queryFn: () => getContribution(campaignId, backerAddress),
        enabled: !!campaignId && !!backerAddress,
        staleTime: 30000
    });
}
