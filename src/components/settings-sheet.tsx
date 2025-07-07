"use client";

import { Settings, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useLauncherSettings } from '@/hooks/use-launcher-settings';
import type { IconPack, LauncherSettings } from '@/lib/types';
import { getAppIcon } from '@/lib/apps';

const ACCENT_COLORS = [
    { name: 'Electric Purple', value: '288 100% 50%' },
    { name: 'Sky Blue', value: '207 90% 54%' },
    { name: 'Lime Green', value: '100 82% 45%' },
    { name: 'Sunset Orange', value: '30 95% 55%' },
    { name: 'Crimson Red', value: '0 84% 60%' },
];

export function SettingsSheet() {
    const { settings, setSettings } = useLauncherSettings();
    const SettingsIcon = getAppIcon('Settings', settings.iconPack);

    return (
        <Sheet>
            <SheetTrigger asChild>
                 <div className="flex flex-col items-center gap-2 text-center cursor-pointer group">
                     <div
                        className="flex items-center justify-center rounded-2xl bg-card/50 transition-all duration-300 group-hover:bg-card"
                         style={{
                            width: settings.iconSize * 0.8,
                            height: settings.iconSize * 0.8,
                        }}
                    >
                        <SettingsIcon 
                            className="text-foreground transition-all duration-300"
                            style={{
                                width: settings.iconSize * 0.44,
                                height: settings.iconSize * 0.44,
                            }}
                            strokeWidth={1.5}
                        />
                    </div>
                    <span className="text-xs text-foreground/80 w-full truncate px-1">Settings</span>
                </div>
            </SheetTrigger>
            <SheetContent className="bg-background/90 backdrop-blur-lg">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2"><Palette /> Personalization</SheetTitle>
                </SheetHeader>
                <div className="space-y-8 py-6">
                    <div className="space-y-4">
                        <Label htmlFor="grid-size">Grid Size</Label>
                        <Select value={String(settings.gridSize)} onValueChange={(v) => setSettings({ gridSize: Number(v) })}>
                            <SelectTrigger id="grid-size"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="4">4 columns</SelectItem>
                                <SelectItem value="5">5 columns</SelectItem>
                                <SelectItem value="6">6 columns</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="icon-size">Icon Size ({settings.iconSize}px)</Label>
                        <Slider
                            id="icon-size"
                            min={48}
                            max={72}
                            step={2}
                            value={[settings.iconSize]}
                            onValueChange={([v]) => setSettings({ iconSize: v })}
                        />
                    </div>

                     <div className="space-y-4">
                        <Label htmlFor="icon-pack">Icon Pack</Label>
                        <Select value={settings.iconPack} onValueChange={(v: IconPack) => setSettings({ iconPack: v })}>
                            <SelectTrigger id="icon-pack"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="monochrome">Monochrome</SelectItem>
                                <SelectItem value="vibrant">Vibrant</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between">
                        <Label htmlFor="show-widgets">Show Widgets</Label>
                        <Switch
                            id="show-widgets"
                            checked={settings.showWidgets}
                            onCheckedChange={(checked) => setSettings({ showWidgets: checked })}
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <Label htmlFor="theme">Theme</Label>
                        <Select value={settings.theme} onValueChange={(v: LauncherSettings['theme']) => setSettings({ theme: v })}>
                            <SelectTrigger id="theme"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <Label>Accent Color</Label>
                        <div className="flex flex-wrap gap-3">
                            {ACCENT_COLORS.map(color => (
                                <button key={color.name} onClick={() => setSettings({ accentColor: color.value })} className="rounded-full w-8 h-8 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring" style={{ backgroundColor: `hsl(${color.value})` }}>
                                     {settings.accentColor === color.value && <div className="w-full h-full rounded-full border-2 border-background/80" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
