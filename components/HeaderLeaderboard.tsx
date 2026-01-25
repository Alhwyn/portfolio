"use client";

import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score?: number;
  points?: number;
}

interface HeaderLeaderboardProps {
  entries?: LeaderboardEntry[];
  title?: string;
  maxEntries?: number;
}

export default function HeaderLeaderboard({ 
  entries = [], 
  title = "Leaderboard",
  maxEntries = 5 
}: HeaderLeaderboardProps) {
  if (!entries || entries.length === 0) {
    return null;
  }

  const displayEntries = entries.slice(0, maxEntries);

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="w-4 h-4 text-yellow-500" />;
    } else if (rank === 2) {
      return <Medal className="w-4 h-4 text-gray-400" />;
    } else if (rank === 3) {
      return <Medal className="w-4 h-4 text-amber-600" />;
    }
    return <Award className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-lg p-4 mb-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center source-serif-4">
        {title}
      </h3>
      <div className="space-y-2">
        {displayEntries.map((entry, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex-shrink-0">
                {getRankIcon(entry.rank)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                {entry.name}
              </span>
            </div>
            {(entry.score !== undefined || entry.points !== undefined) && (
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-2 flex-shrink-0">
                {entry.score !== undefined ? entry.score : entry.points}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
