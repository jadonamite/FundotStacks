import { useQuery } from '@tanstack/react-query';
import { isRefundProcessed } from '../api/refunds.js';

export function useRefundStatus(campaignId, backer) {
    return useQuery({
        queryKey: ['refund-status', campaignId, backer],
        queryFn: () => isRefundProcessed(campaignId, backer),
        enabled: !!campaignId && !!backer,
        staleTime: 60000
    });
}
