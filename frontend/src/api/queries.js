/**
 * Campaign Contract Read-Only Operations
 * Handles all read-only queries to fetch blockchain state
 */

import { callReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';
import { getStacksNetwork, API_URL } from './stacks-client.js';
import { CAMPAIGN_CORE } from './contract-config.js';

/**
 * Get campaign details by ID
 */
export async function getCampaignDetails(campaignId) {
    try {
        const result = await callReadOnlyFunction({
            contractAddress: CAMPAIGN_CORE.address,
            contractName: CAMPAIGN_CORE.name,
            functionName: 'get-campaign',
            functionArgs: [uintCV(BigInt(campaignId))],
            network: getStacksNetwork(),
            senderAddress: CAMPAIGN_CORE.address
        });

        const jsonResult = cvToJSON(result);

        if (jsonResult.value && jsonResult.value.value) {
            const campaign = jsonResult.value.value;
            return {
                id: campaignId,
                creator: campaign.creator.value,
                title: campaign.title.value,
                description: campaign.description.value,
                goalAmount: parseInt(campaign['goal-amount'].value) / 1000000,
                raisedAmount: parseInt(campaign['raised-amount'].value) / 1000000,
                deadline: parseInt(campaign.deadline.value),
                status: parseInt(campaign.status.value),
                milestonesEnabled: campaign['milestones-enabled'].value,
                createdAt: parseInt(campaign['created-at'].value)
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching campaign:', error);
        throw error;
    }
}

/**
 * Get user's contribution to a campaign
 */
export async function getContribution(campaignId, backerAddress) {
    try {
        const result = await callReadOnlyFunction({
            contractAddress: CAMPAIGN_CORE.address,
            contractName: CAMPAIGN_CORE.name,
            functionName: 'get-contribution',
            functionArgs: [uintCV(BigInt(campaignId)), principalCV(backerAddress)],
            network: getStacksNetwork(),
            senderAddress: CAMPAIGN_CORE.address
        });

        const jsonResult = cvToJSON(result);

        if (jsonResult.value && jsonResult.value.value) {
            const contribution = jsonResult.value.value;
            return {
                amount: parseInt(contribution.amount.value) / 1000000,
                timestamp: parseInt(contribution.timestamp.value)
            };
        }

        return null;
    } catch (error) {
        console.error('Error fetching contribution:', error);
        throw error;
    }
}

/**
 * Get total number of campaigns
 */
export async function getTotalCampaigns() {
    try {
        const result = await callReadOnlyFunction({
            contractAddress: CAMPAIGN_CORE.address,
            contractName: CAMPAIGN_CORE.name,
            functionName: 'get-campaign-count',
            functionArgs: [],
            network: getStacksNetwork(),
            senderAddress: CAMPAIGN_CORE.address
        });

        const jsonResult = cvToJSON(result);
        return parseInt(jsonResult.value.value);
    } catch (error) {
        console.error('Error fetching total campaigns:', error);
        throw error;
    }
}

/**
 * Get all campaigns (fetches by iterating from 1 to total)
 */
export async function getAllCampaigns() {
    try {
        const total = await getTotalCampaigns();
        const campaigns = [];

        for (let i = 1; i <= total; i++) {
            try {
                const campaign = await getCampaignDetails(i);
                if (campaign) {
                    campaigns.push(campaign);
                }
            } catch (e) {
                console.error(`Error fetching campaign ${i}:`, e);
            }
        }

        return campaigns;
    } catch (error) {
        console.error('Error fetching all campaigns:', error);
        throw error;
    }
}
