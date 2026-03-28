import { callReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';
import { getStacksNetwork } from './stacks-client.js';
import { REFUND_HANDLER } from './contract-config.js';

export async function isRefundProcessed(campaignId, backerAddress) {
    const result = await callReadOnlyFunction({
        contractAddress: REFUND_HANDLER.address,
        contractName: REFUND_HANDLER.name,
        functionName: 'is-refund-processed',
        functionArgs: [uintCV(BigInt(campaignId)), principalCV(backerAddress)],
        network: getStacksNetwork(),
        senderAddress: REFUND_HANDLER.address
    });

    const json = cvToJSON(result);
    return Boolean(json.value);
}
