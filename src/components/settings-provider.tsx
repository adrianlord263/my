"use client";

import { useEffect, useState, useMemo, useCallback, ReactNode } from 'react';
import { SettingsContext, DEFAULT_SETTINGS } from '@/hooks/use-launcher-settings';
import type { LauncherSettings } from '@/lib/types';

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
