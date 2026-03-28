# FundotStacks

![FundotStacks Logo](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=for-the-badge)
![Bitcoin Secured](https://img.shields.io/badge/Secured%20by-Bitcoin-F7931A?style=for-the-badge)

## 🚀 Overview

**FundotStacks v1** is a decentralized crowdfunding platform built on the Stacks blockchain, enabling creators to launch campaigns and receive funding in STX tokens through a no-custody direct-transfer flow. All transactions are secured by Bitcoin's Proof of Work through Stacks' Proof of Transfer consensus.

### Key Features

- ✅ **Bitcoin-Secured**: All transactions anchored to Bitcoin for maximum security
- 🎯 **On-Chain Campaign Tracking**: Campaign state and contributions are recorded with Clarity contracts
- 📊 **Milestone Visibility**: Campaigns can publish milestone progress on-chain for backers
- 💰 **Zero Platform Fees**: No middleman, only blockchain transaction costs
- 🔄 **Refund Ledger**: Refunds can be logged on-chain after creators coordinate them manually
- 🎨 **NFT Reward Records**: Backers can be linked to proof-of-support NFTs

## 🏗️ Architecture

### Smart Contracts (Clarity 4)

- **campaign-core.clar**: Main campaign lifecycle management
- **milestone-manager.clar**: Milestone progress tracking
- **refund-handler.clar**: Refund status ledger
- **nft-rewards.clar**: SIP-009 proof-of-support reward records

### Frontend (React + Vite)

- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS with custom orange theme + dark mode
- **State Management**: Zustand + React Query
- **Blockchain Integration**: @stacks/connect, @stacks/transactions

## 🛠️ Quick Start

```bash
# Install dependencies (frontend)
cd frontend && npm install

# Start development server
npm run dev

# Check smart contracts
clarinet check
```

## 📖 Documentation

See [architecture.md](./architecture.md) for complete technical documentation.

---

**Built on Stacks, secured by Bitcoin**
