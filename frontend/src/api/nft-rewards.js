import { callReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { NFT_REWARDS } from './contract-config.js';

export async function getBackerNFT(campaignId, backerAddress) {
    const result = await callReadOnlyFunction({
        contractAddress: NFT_REWARDS.address,
        contractName: NFT_REWARDS.name,
        functionName: 'get-backer-nft',
        functionArgs: [uintCV(BigInt(campaignId)), principalCV(backerAddress)],
        network: getStacksNetwork(),
        senderAddress: NFT_REWARDS.address
    });

    const json = cvToJSON(result);
    const payload = json.value?.value;
    if (!payload || !payload.token_id) return null;
    return Number(payload.token_id.value);
}

export async function getTokenURI(tokenId) {
    const result = await callReadOnlyFunction({
        contractAddress: NFT_REWARDS.address,
        contractName: NFT_REWARDS.name,
        functionName: 'get-token-uri',
        functionArgs: [uintCV(BigInt(tokenId))],
        network: getStacksNetwork(),
        senderAddress: NFT_REWARDS.address
    });

    const json = cvToJSON(result);
    if (!json.value || !json.value.value) return null;
    return json.value.value.value;
}
