"use client";

import { useState, useEffect } from 'react';

export function ClockWidget() {
    const [time, setTime] = useState({ hours: '--', minutes: '--' });
    const [date, setDate] = useState('');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime({
                hours: now.getHours().toString().padStart(2, '0'),
                minutes: now.getMinutes().toString().padStart(2, '0'),
            });
            setDate(now.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            }));
        };

        updateClock();
        const timerId = setInterval(updateClock, 1000);

        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="mb-8 px-2">
            <h1 className="text-7xl font-bold text-foreground">
                {time.hours}<span className="animate-pulse">:</span>{time.minutes}
            </h1>
            <p className="text-lg text-foreground/60">{date}</p>
        </div>
    );
}
