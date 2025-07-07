"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback, ReactNode } from 'react';
import type { LauncherSettings } from '@/lib/types';

const DEFAULT_SETTINGS: LauncherSettings = {
  gridSize: 5,
  iconSize: 56,
  iconPack: 'default',
  showWidgets: true,
  theme: 'dark',
  accentColor: '288 100% 50%', // Electric Purple
};

type SettingsContextType = {
  settings: LauncherSettings;
  setSettings: (settings: Partial<LauncherSettings>) => void;
  isLoaded: boolean;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<LauncherSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('auraLauncherSettings');
      if (savedSettings) {
        setSettingsState(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const setSettings = useCallback((newSettings: Partial<LauncherSettings>) => {
    setSettingsState(prevSettings => {
      const updatedSettings = { ...prevSettings, ...newSettings };
      try {
        localStorage.setItem('auraLauncherSettings', JSON.stringify(updatedSettings));
      } catch (error) {
        console.error("Failed to save settings to localStorage", error);
      }
      return updatedSettings;
    });
  }, []);
  
  const value = useMemo(() => ({ settings, setSettings, isLoaded }), [settings, setSettings, isLoaded]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useLauncherSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useLauncherSettings must be used within a SettingsProvider');
  }
  return context;
}
