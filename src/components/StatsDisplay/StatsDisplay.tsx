import React from "react";
import type { StatsDisplayProps } from "../../types";

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  showReadingTime = true,
}) => {
  const { characterCount, wordCount, readingTime } = stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <StatCard label="Characters" value={characterCount} />
      <StatCard label="Words" value={wordCount} />
      {showReadingTime && (
        <StatCard label="Reading Time" value={`${readingTime} min`} />
      )}
    </div>
  );
};

// A small reusable card.
const StatCard: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
    <div className="text-2xl font-bold text-blue-600">{value}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
  </div>
);