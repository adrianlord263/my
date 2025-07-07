"use client";

import { useLauncherSettings } from '@/hooks/use-launcher-settings';
import { APPS } from '@/lib/apps';
import { AppIcon } from './app-icon';

export function HomeScreenGrid() {
  const { settings } = useLauncherSettings();

  return (
    <div
      className="grid gap-x-2 gap-y-4 transition-all duration-300 ease-in-out"
      style={{
        gridTemplateColumns: `repeat(${settings.gridSize}, minmax(0, 1fr))`,
      }}
    >
      {APPS.map((app) => (
        <AppIcon key={app.id} app={app} />
      ))}
    </div>
  );
}
