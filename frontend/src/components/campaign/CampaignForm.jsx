/**
 * Campaign Form Component
 * Form for creating new campaigns with validation
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransaction } from '../../hooks/useTransaction.js';
import { useStacksAuth } from '../../hooks/useStacksAuth.js';
import { createCampaign } from '../../api/contract-calls.js';
import { useState } from 'react';
import { LoadingSpinner } from '../common/LoadingSpinner.jsx';
import { ErrorAlert } from '../common/ErrorAlert.jsx';

const campaignSchema = z.object({
    title: z.string().min(10, 'Title must be at least 10 characters').max(100, 'Title must be less than 100 characters'),
    description: z.string().min(50, 'Description must be at least 50 characters').max(500, 'Description must be less than 500 characters'),
    goalAmount: z.number().min(1, 'Goal must be at least 1 STX').max(1000000, 'Goal cannot exceed 1,000,000 STX'),
    deadline: z.number().min(144, 'Deadline must be at least 144 blocks (~24 hours)'),
    milestonesEnabled: z.boolean().optional()
});

export function CampaignForm({ onSuccess }) {
    const { stxAddress } = useStacksAuth();
    const { submitTransaction, status, error } = useTransaction();
    const [successTxId, setSuccessTxId] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            milestonesEnabled: false
        }
    });

    const onSubmit = async (data) => {
        try {
            const result = await submitTransaction(createCampaign, data, stxAddress);
            // Safely access txId - it might be in different properties
            const txId = result?.txId || result?.tx_id || result?.txid || 'pending';
            setSuccessTxId(txId);
            reset();
            if (onSuccess) onSuccess(result);
        } catch (err) {
            console.error('Campaign creation failed:', err);
        }
    };

    const isSubmitting = status === 'pending' || status === 'confirming';

    if (successTxId) {
        return (
            <div className="card p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Campaign Created!</h3>
                <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                    Your campaign has been submitted to the blockchain.
                </p>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-6">
                    Transaction ID: <span className="font-mono">{successTxId}</span>
                </p>
                <button
                    onClick={() => setSuccessTxId(null)}
                    className="btn btn-primary"
                >
                    Create Another Campaign
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-busy={isSubmitting}>
            {/* Title */}
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Campaign Title *
                </label>
                <input
                    {...register('title')}
                    type="text"
                    placeholder="Enter your campaign title"
                    className="input"
                    disabled={isSubmitting}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Description *
                </label>
                <textarea
                    {...register('description')}
                    rows={4}
                    placeholder="Describe your campaign (minimum 50 characters)"
                    className="input resize-none"
                    disabled={isSubmitting}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>

            {/* Goal Amount */}
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Funding Goal (STX) *
                </label>
                <input
                    {...register('goalAmount', { valueAsNumber: true })}
                    type="number"
                    step="0.000001"
                    placeholder="Enter goal amount in STX"
                    className="input"
                    disabled={isSubmitting}
                />
                {errors.goalAmount && (
                    <p className="text-red-500 text-sm mt-1">{errors.goalAmount.message}</p>
                )}
            </div>

            {/* Deadline */}
            <div>
                <label className="block text-sm font-semibold mb-2">
                    Deadline (in blocks) *
                </label>
                <input
                    {...register('deadline', { valueAsNumber: true })}
                    type="number"
                    placeholder="Minimum 144 blocks (~24 hours)"
                    className="input"
                    disabled={isSubmitting}
                />
                <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                    ~10 minutes per block. 144 blocks ≈ 1 day, 1008 blocks ≈ 1 week
                </p>
                {errors.deadline && (
                    <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
                )}
            </div>

            {/* Milestones */}
            <div className="flex items-start gap-3">
                <input
                    {...register('milestonesEnabled')}
                    type="checkbox"
                    id="milestones"
                    className="mt-1 w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                    disabled={isSubmitting}
                />
                <label htmlFor="milestones" className="text-sm">
                    <span className="font-semibold block">Enable Milestone-Based Funding</span>
                    <span className="text-secondary-600 dark:text-secondary-400">
                        Release funds in stages as you complete project milestones
                    </span>
                </label>
            </div>

            {/* Error Display */}
            {error && (
                <ErrorAlert message={error} />
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
                {isSubmitting && <LoadingSpinner size="sm" />}
                {status === 'pending' && 'Awaiting Wallet...'}
                {status === 'confirming' && 'Confirming on Blockchain...'}
                {status === 'idle' && 'Create Campaign'}
                {status === 'error' && 'Try Again'}
            </button>
        </form>
    );
}
