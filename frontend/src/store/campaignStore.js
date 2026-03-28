/**
 * Zustand Store - Campaign State
 * Manages campaign data and filters
 */

import { create } from 'zustand';

const FILTER_STORAGE_KEY = 'fundot-campaign-filters';

const readFilters = () => {
    if (typeof window === 'undefined') {
        return {
            status: 'all',
            sortBy: 'recent'
        };
    }

    try {
        const stored = window.localStorage.getItem(FILTER_STORAGE_KEY);
        if (!stored) return { status: 'all', sortBy: 'recent' };
        return JSON.parse(stored);
    } catch (err) {
        console.warn('Failed to parse campaign filters from storage', err);
        return { status: 'all', sortBy: 'recent' };
    }
};

const writeFilters = (filters) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
};

export const useCampaignStore = create((set, get) => ({
    campaigns: [],
    selectedCampaign: null,
    filters: readFilters(),

    setCampaigns: (campaigns) => set({ campaigns }),

    selectCampaign: (campaignId) => {
        const campaign = get().campaigns.find(c => c.id === campaignId);
        set({ selectedCampaign: campaign });
    },

    updateCampaignLocally: (campaignId, updates) => set((state) => ({
        campaigns: state.campaigns.map(c =>
            c.id === campaignId ? { ...c, ...updates } : c
        )
    })),

    setFilters: (filters) => {
        const next = { ...get().filters, ...filters };
        writeFilters(next);
        set({ filters: next });
    },

    getFilteredCampaigns: () => {
        const { campaigns, filters } = get();
        let filtered = [...campaigns];

        // Filter by status
        if (filters.status !== 'all') {
            const statusMap = { active: 1, funded: 2, completed: 3, cancelled: 4 };
            filtered = filtered.filter(c => c.status === statusMap[filters.status]);
        }

        // Sort
        switch (filters.sortBy) {
            case 'recent':
                filtered.sort((a, b) => b.createdAt - a.createdAt);
                break;
            case 'ending-soon':
                filtered.sort((a, b) => a.deadline - b.deadline);
                break;
            case 'most-funded':
                filtered.sort((a, b) => b.raisedAmount - a.raisedAmount);
                break;
            default:
                break;
        }

        return filtered;
    }
}));
