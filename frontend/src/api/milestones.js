import { callReadOnlyFunction, cvToJSON, uintCV } from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { MILESTONE_MANAGER } from './contract-config.js';

const parseMilestone = (raw) => {
    if (!raw) return null;

    return {
        description: raw.description?.value || '',
        percentage: Number(raw.percentage?.value ?? 0),
        completed: Boolean(raw.released?.value),
        verified: Boolean(raw.verified?.value),
        verifier: raw.verifier?.value?.value || null
    };
};

export async function getCampaignMilestoneConfig(campaignId) {
    const result = await callReadOnlyFunction({
        contractAddress: MILESTONE_MANAGER.address,
        contractName: MILESTONE_MANAGER.name,
        functionName: 'get-campaign-milestone-config',
        functionArgs: [uintCV(BigInt(campaignId))],
        network: getStacksNetwork(),
        senderAddress: MILESTONE_MANAGER.address
    });

    const json = cvToJSON(result);
    const config = json.value?.value;

    if (!config) return null;

    return {
        totalMilestones: Number(config['total-milestones']?.value ?? 0),
        completedMilestones: Number(config['completed-milestones']?.value ?? 0),
        verificationRequired: Boolean(config['verification-required']?.value)
    };
}

export async function getCampaignMilestone(campaignId, milestoneId) {
    const result = await callReadOnlyFunction({
        contractAddress: MILESTONE_MANAGER.address,
        contractName: MILESTONE_MANAGER.name,
        functionName: 'get-milestone',
        functionArgs: [uintCV(BigInt(campaignId)), uintCV(BigInt(milestoneId))],
        network: getStacksNetwork(),
        senderAddress: MILESTONE_MANAGER.address
    });

    const json = cvToJSON(result);
    const milestone = json.value?.value;

    return parseMilestone(milestone);
}

export async function getCampaignMilestones(campaignId) {
    const config = await getCampaignMilestoneConfig(campaignId);

    if (!config || config.totalMilestones === 0) {
        return [];
    }

    const milestoneCalls = [];
    for (let i = 0; i < config.totalMilestones; i += 1) {
        milestoneCalls.push(getCampaignMilestone(campaignId, i));
    }

    const milestones = await Promise.all(milestoneCalls);
    return milestones.filter(Boolean);
}
