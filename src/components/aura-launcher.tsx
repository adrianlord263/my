"use client";

import { useEffect } from 'react';
import { useLauncherSettings } from '@/hooks/use-launcher-settings';
import { SettingsProvider } from '@/components/settings-provider';
import { HomeScreenGrid } from '@/components/home-screen-grid';
import { Dock } from '@/components/dock';
import { ClockWidget } from '@/components/clock-widget';
import { Skeleton } from './ui/skeleton';

function LauncherUI() {
    const { settings, isLoaded } = useLauncherSettings();

    useEffect(() => {
        const root = document.documentElement;
        if (!isLoaded) return;
        
        // Handle theme
        if (settings.theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.toggle('dark', systemTheme === 'dark');
        } else {
            root.classList.toggle('dark', settings.theme === 'dark');
        }

        // Handle accent color
        root.style.setProperty('--primary', settings.accentColor);
        root.style.setProperty('--accent', settings.accentColor);
        root.style.setProperty('--ring', settings.accentColor);

    }, [settings, isLoaded]);
    
    if (!isLoaded) {
        return (
             <div className="relative h-full w-full bg-background flex flex-col">
                <div className="flex-grow p-4 space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <div className="grid grid-cols-5 gap-4">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <Skeleton className="h-14 w-14 rounded-xl" />
                                <Skeleton className="h-4 w-12" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4">
                    <Skeleton className="h-20 w-full rounded-2xl" />
                </div>
            </div>
        )
    }

    return (
        <div className="relative h-full w-full bg-background flex flex-col font-body transition-colors duration-300">
            <main className="flex-grow p-4 pt-12 overflow-y-auto">
                 {settings.showWidgets && <ClockWidget />}
                <HomeScreenGrid />
            </main>
            <Dock />
        </div>
    );
}

export function AuraLauncher() {
    return (
        <SettingsProvider>
            <div className="w-full h-full min-h-screen bg-black flex items-center justify-center p-4">
                <div className="relative w-full max-w-[420px] h-[896px] max-h-[90vh] bg-background rounded-[40px] border-[8px] border-neutral-800 shadow-2xl overflow-hidden">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-neutral-800 rounded-b-2xl z-20" />
                   <LauncherUI />
                </div>
            </div>
        </SettingsProvider>
    );
}
