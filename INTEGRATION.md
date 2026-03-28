# Frontend Integration Instructions

## 1. Update Environment Variables

Copy `.env.example` to `.env`:
```bash
cd frontend
cp .env.example .env
```

The `.env` file should contain:
```env
VITE_NETWORK=testnet
VITE_STACKS_API=https://api.testnet.hiro.so

# Deployed Contract Addresses (Testnet - Clarity 4)
VITE_CAMPAIGN_CORE_ADDRESS=ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.campaign-core
VITE_MILESTONE_MANAGER_ADDRESS=ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.milestone-manager
VITE_NFT_REWARDS_ADDRESS=ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.nft-rewards
VITE_REFUND_HANDLER_ADDRESS=ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.refund-handler
```

## 2. Key Architecture Changes

### FundotStacks v1 No-Custody Model
The current contracts use a **direct transfer** architecture:

- ✅ Backers send STX **directly to campaign creators**
- ✅ Contracts primarily **track state** (no custody of funds)
- ✅ `complete-campaign` replaces `finalize-campaign` (just marks as complete)

### Updated Functions

**contract-calls.js**:
- `createCampaign()` - unchanged
- `fundCampaign()` - **funds go directly to creator** (not contract)
- `completeCampaign()` - renamed from `finalizeCampaign` (no fund transfer)
- `cancelCampaign()` - unchanged

**queries.js**:
- `getCampaignDetails()` - unchanged
- `getContribution()` - unchanged
- `getTotalCampaigns()` - uses `get-campaign-count` function
- `getAllCampaigns()` - unchanged

## 3. Testing on Testnet

### Start Development Server
```bash
cd frontend
npm run dev
```

### Test Flow
1. **Connect Wallet** - Use Hiro Wallet or Leather on testnet
2. **Create Campaign** - Fill out form and submit
3. **Fund Campaign** - Contribute STX (goes directly to creator)
4. **View Campaign** - See updated raised amount
5. **Complete Campaign** - Creator marks as complete

### Important Notes

- **Funds Transfer**: When backing a campaign, STX transfers **directly to the creator's address**, not to the contract
- **Refunds**: If campaign fails, creator must **manually refund** backers (contract only tracks refund status)
- **Milestones**: Informational only in v1 - funds already with creator
- **NFT Rewards**: Optional proof-of-support records, not part of the funding path

## 4. Frontend Code Updates Made

### Files Updated:
1. ✅ `frontend/.env.example` - Added deployed contract addresses
2. ✅ `frontend/src/api/contract-calls.js` - Updated to parse contract addresses and renamed `finalizeCampaign` to `completeCampaign`
3. ✅ `frontend/src/api/queries.js` - Updated to parse contract addresses and fixed function name

### Files That May Need Updates:
- `src/pages/CampaignDetail.jsx` - Update button text from "Finalize" to "Complete"
- `src/components/campaign/CampaignForm.jsx` - May need validation updates
- Any components calling `finalizeCampaign()` - Change to `completeCampaign()`

## 5. Next Steps

1. Copy `.env.example` to `.env`
2. Restart dev server: `npm run dev`
3. Test campaign creation
4. Test funding flow
5. Verify transactions on testnet explorer

## 6. Testnet Explorer Links

View your transactions:
- Campaign Core: https://explorer.hiro.so/txid/ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.campaign-core?chain=testnet
- Milestone Manager: https://explorer.hiro.so/txid/ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.milestone-manager?chain=testnet
- NFT Rewards: https://explorer.hiro.so/txid/ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.nft-rewards?chain=testnet
- Refund Handler: https://explorer.hiro.so/txid/ST31DP8F8CF2GXSZBHHHK5J6Y061744E1TP7FRGHT.refund-handler?chain=testnet
