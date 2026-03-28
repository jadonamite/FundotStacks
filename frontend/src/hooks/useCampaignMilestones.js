import { useQuery } from '@tanstack/react-query';
import { getCampaignMilestones } from '../api/milestones.js';

export function useCampaignMilestones(campaignId) {
    return useQuery({
        queryKey: ['campaign-milestones', campaignId],
        queryFn: () => getCampaignMilestones(campaignId),
        enabled: !!campaignId,
        staleTime: 60000
    });
}
