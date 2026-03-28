/**
 * Campaign Contract Write Operations
 * Handles all transactions that modify blockchain state
 */

import { openContractCall } from '@stacks/connect';
import {
    stringAsciiCV,
    stringUtf8CV,
    uintCV,
    boolCV,
    PostConditionMode,
    makeStandardSTXPostCondition,
    FungibleConditionCode
} from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { CAMPAIGN_CORE } from './contract-config.js';

/**
 * Create a new campaign
 */
export async function createCampaign(campaignData, userAddress) {
    const { title, description, goalAmount, deadline, milestonesEnabled } = campaignData;

    const functionArgs = [
        stringAsciiCV(title),
        stringUtf8CV(description),
        uintCV(BigInt(Math.floor(goalAmount * 1000000))), // Convert STX to micro-STX
        uintCV(BigInt(deadline)),
        boolCV(milestonesEnabled || false)
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'create-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            console.log('Campaign created:', data);
            return data;
        },
        onCancel: () => {
            console.log('Transaction cancelled by user');
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Fund a campaign
 */
export async function fundCampaign(campaignId, amount, userAddress) {
    const amountMicroStx = BigInt(Math.floor(amount * 1000000));

    const functionArgs = [
        uintCV(BigInt(campaignId)),
        uintCV(amountMicroStx)
    ];

    // Post-condition: Ensure exact STX transfer
    const postConditions = [
        makeStandardSTXPostCondition(
            userAddress,
            FungibleConditionCode.Equal,
            amountMicroStx
        )
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'fund-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions,
        onFinish: (data) => {
            console.log('Funding successful:', data);
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Complete campaign (mark as completed - funds already with creator)
 */
export async function completeCampaign(campaignId) {
    const functionArgs = [
        uintCV(BigInt(campaignId))
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'complete-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            console.log('Campaign completed:', data);
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}

/**
 * Cancel campaign
 */
export async function cancelCampaign(campaignId) {
    const functionArgs = [
        uintCV(BigInt(campaignId))
    ];

    const txOptions = {
        contractAddress: CAMPAIGN_CORE.address,
        contractName: CAMPAIGN_CORE.name,
        functionName: 'cancel-campaign',
        functionArgs,
        network: getStacksNetwork(),
        postConditionMode: PostConditionMode.Deny,
        postConditions: [],
        onFinish: (data) => {
            console.log('Campaign cancelled:', data);
            return data;
        },
        onCancel: () => {
            throw new Error('User cancelled transaction');
        }
    };

    return openContractCall(txOptions);
}
