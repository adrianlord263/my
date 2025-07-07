"use client";

import { createContext, useContext } from 'react';
import type { LauncherSettings } from '@/lib/types';

export const DEFAULT_SETTINGS: LauncherSettings = {
  gridSize: 5,
  iconSize: 56,
  iconPack: 'default',
  showWidgets: true,
  theme: 'dark',
  accentColor: '288 100% 50%', // Electric Purple
};

export type SettingsContextType = {
  settings: LauncherSettings;
  setSettings: (settings: Partial<LauncherSettings>) => void;
  isLoaded: boolean;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function useLauncherSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useLauncherSettings must be used within a SettingsProvider');
  }
  return context;
}
