import type { App, IconPack } from '@/lib/types';
import {
  Globe,
  Mail,
  Music,
  MessageSquare,
  Camera,
  Calendar,
  Calculator,
  Settings,
  Compass,
  MailOpen,
  Music2,
  MessageCircle,
  Video,
  CalendarDays,
  Sigma,
  SlidersHorizontal,
  Flame,
  Feather,
  Gem,
  Bot,
  BrainCircuit,
  Cloud,
  Code,
  Component,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const APPS: App[] = [
  { id: '1', name: 'Browser' },
  { id: '2', name: 'Mail' },
  { id: '3', name: 'Music' },
  { id: '4', name: 'Messages' },
  { id: '5', name: 'Camera' },
  { id: '6', name: 'Calendar' },
  { id: '7', name: 'Calculator' },
  { id: '8', name: 'AI Assistant' },
  { id: '9', name: 'Cloud Drive' },
  { id: '10', name: 'Dev Tools' },
  { id: '11', name: 'Notes' },
  { id: '12', name: 'Photos' },
];

export const DOCK_APPS: App[] = [
    { id: 'd1', name: 'Browser' },
    { id: 'd2', name: 'Mail' },
    { id: 'd3', name: 'Messages' },
    { id: 'd4', name: 'Camera' },
];


const ICONS: Record<string, Record<IconPack, LucideIcon>> = {
    'Browser': { default: Globe, monochrome: Compass, vibrant: Flame },
    'Mail': { default: Mail, monochrome: MailOpen, vibrant: Feather },
    'Music': { default: Music, monochrome: Music2, vibrant: Gem },
    'Messages': { default: MessageSquare, monochrome: MessageCircle, vibrant: Bot },
    'Camera': { default: Camera, monochrome: Video, vibrant: BrainCircuit },
    'Calendar': { default: Calendar, monochrome: CalendarDays, vibrant: Cloud },
    'Calculator': { default: Calculator, monochrome: Sigma, vibrant: Code },
    'Settings': { default: Settings, monochrome: SlidersHorizontal, vibrant: Component },
    'AI Assistant': { default: Bot, monochrome: BrainCircuit, vibrant: Gem },
    'Cloud Drive': { default: Cloud, monochrome: Feather, vibrant: Globe },
    'Dev Tools': { default: Code, monochrome: Component, vibrant: Sigma },
    'Notes': { default: MessageCircle, monochrome: MailOpen, vibrant: Music2 },
    'Photos': { default: Video, monochrome: Camera, vibrant: Flame },
};

export function getAppIcon(appName: string, iconPack: IconPack): LucideIcon {
    return ICONS[appName]?.[iconPack] || ICONS[appName]?.default || Settings;
}
