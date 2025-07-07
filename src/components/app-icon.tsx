"use client";

import { useLauncherSettings } from '@/hooks/use-launcher-settings';
import { getAppIcon } from '@/lib/apps';
import type { App } from '@/lib/types';
import { motion } from 'framer-motion';

type AppIconProps = {
  app: App;
};

// Lazy load framer-motion
const loadFramerMotion = () => import('framer-motion').then(mod => mod.motion);

export function AppIcon({ app }: AppIconProps) {
  const { settings } = useLauncherSettings();
  const Icon = getAppIcon(app.name, settings.iconPack);

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      className="flex flex-col items-center gap-2 text-center cursor-pointer group"
    >
      <div
        className="flex items-center justify-center rounded-2xl bg-card/50 transition-all duration-300 group-hover:bg-card"
        style={{
          width: settings.iconSize,
          height: settings.iconSize,
        }}
      >
        <Icon
          className="text-foreground transition-all duration-300"
          style={{
            width: settings.iconSize * 0.55,
            height: settings.iconSize * 0.55,
          }}
          strokeWidth={1.5}
        />
      </div>
      <span className="text-xs text-foreground/80 w-full truncate px-1">
        {app.name}
      </span>
    </motion.div>
  );
}
