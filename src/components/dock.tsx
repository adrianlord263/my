"use client";

import { DOCK_APPS } from '@/lib/apps';
import { AppIcon } from './app-icon';
import { SettingsSheet } from './settings-sheet';
import { useLauncherSettings } from '@/hooks/use-launcher-settings';

export function Dock() {
    const { settings } = useLauncherSettings();
    const iconSize = Math.max(settings.iconSize * 0.8, 40);

    return (
        <footer className="px-4 pb-4">
            <div className="bg-card/50 backdrop-blur-lg rounded-2xl p-2">
                <div className="grid grid-cols-5 items-center justify-items-center gap-2">
                    {DOCK_APPS.map(app => (
                        <AppIcon key={app.id} app={app} />
                    ))}
                    <SettingsSheet />
                </div>
            </div>
        </footer>
    );
}
