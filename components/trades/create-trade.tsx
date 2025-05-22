"use client";

import { X } from '@/components/icons/icons';
import TradeComposer from '@/components/trades/TradeComposer';

export default function CreateTrade() {

    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center gap-1 p-4 md:p-0">
                <div className="flex w-full max-w-[750px] justify-start">
                    <button
                        className="flex items-center gap-1 rounded-lg bg-[#F0F0F0] px-2 py-1.5 dark:bg-[#1A1A1A]"
                        type="button"
                        aria-label="Close trade composer"
                    >
                        <X className="mt-0.5 h-3.5 w-3.5 fill-[#6D6D6D] dark:fill-[#929292]" />
                        <span className="text-sm font-medium text-[#6D6D6D] dark:text-white">esc</span>
                    </button>
                </div>
                <TradeComposer />
            </div>
        </>
    );
}
