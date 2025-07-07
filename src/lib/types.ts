import type { LucideIcon } from 'lucide-react';

export type IconPack = 'default' | 'monochrome' | 'vibrant';

export type App = {
  id: string;
  name: string;
};

export type LauncherSettings = {
  gridSize: number;
  iconSize: number;
  iconPack: IconPack;
  showWidgets: boolean;
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
};
