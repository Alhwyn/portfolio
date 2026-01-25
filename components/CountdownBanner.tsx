"use client";

import { useEffect, useState } from "react";
import HeaderLeaderboard from "./HeaderLeaderboard";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score?: number;
  points?: number;
}

interface CountdownBannerProps {
  targetDate: string;
  eventName: string;
  lumaUrl?: string;
  lumaModelUrl?: string;
  leaderboardEntries?: LeaderboardEntry[];
  showLeaderboard?: boolean;
}

export default function CountdownBanner({ targetDate, eventName, lumaUrl, lumaModelUrl, leaderboardEntries, showLeaderboard }: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  // Extract model ID from Luma URL (e.g., https://luma.com/7bs63dew -> 7bs63dew)
  const getLumaEmbedUrl = (url: string) => {
    // Handle luma.com URLs
    const lumaMatch = url.match(/luma\.com\/([^\/\?]+)/);
    if (lumaMatch) {
      return `https://lumalabs.ai/embed/${lumaMatch[1]}`;
    }
    // Handle lumalabs.ai URLs
    const lumalabsMatch = url.match(/lumalabs\.ai\/([^\/\?]+)/);
    if (lumalabsMatch) {
      return `https://lumalabs.ai/embed/${lumalabsMatch[1]}`;
    }
    return url;
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 py-4 px-4 text-center z-50 border-b border-gray-200 dark:border-neutral-700">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {lumaModelUrl && (
            <div className="lg:col-span-2 w-full flex justify-center">
              <div className="w-full max-w-2xl aspect-video rounded-lg overflow-hidden bg-black">
                <iframe
                  src={getLumaEmbedUrl(lumaModelUrl)}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>
            </div>
          )}
          {showLeaderboard && leaderboardEntries && leaderboardEntries.length > 0 && (
            <div className={lumaModelUrl ? "lg:col-span-1" : "lg:col-span-3"}>
              <HeaderLeaderboard 
                entries={leaderboardEntries} 
                title={`${eventName} Leaderboard`}
                maxEntries={5}
              />
            </div>
          )}
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
          <span className="text-base sm:text-lg font-medium source-serif-4">
            {eventName} starts in
          </span>
          <div className="text-sm sm:text-base bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 px-3 py-1 rounded border border-gray-200 dark:border-neutral-700 whitespace-nowrap">
            {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>

          {lumaUrl && (
            <a
              href={lumaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 text-sm sm:text-base bg-black text-white dark:bg-white dark:text-black rounded-lg hover:opacity-80 transition-opacity font-medium whitespace-nowrap"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

