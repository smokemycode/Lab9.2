import React, { useCallback, useMemo, useState } from "react";
import type { CharacterCounterProps, TextStats } from "../../types";
import { TextInput } from "../TextInput/TextInput";
import { StatsDisplay } from "../StatsDisplay/StatsDisplay";

// Words per minute used to estimate reading time
const WORDS_PER_MINUTE = 200;

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  minWords,
  maxWords,
  targetReadingTime,
}) => {
  const [text, setText] = useState("");

  // Called by TextInput whenever the user types.
  // useCallback keeps the same function reference between renders.
  const handleTextChange = useCallback((newText: string) => {
    setText(newText);
  }, []);

  // Recompute stats only when `text` changes. useMemo caches the result.
  const stats: TextStats = useMemo(() => {
    const trimmed = text.trim();
    const characterCount = text.length;

    // Split on whitespace; filter out empty strings so "  hello  " counts as 1 word.
    const words = trimmed.length === 0 ? [] : trimmed.split(/\s+/);
    const wordCount = words.length;

    // Reading time in minutes, rounded to 1 decimal place.
    // Empty text -> 0 minutes.
    const readingTime =
      wordCount === 0
        ? 0
        : Math.round((wordCount / WORDS_PER_MINUTE) * 10) / 10;

    return { characterCount, wordCount, readingTime };
  }, [text]);

  // Progress toward the word goal (0-100%).
  const progress = (() => {
    if (!maxWords || maxWords <= 0) return 0;
    return Math.min(100, Math.round((stats.wordCount / maxWords) * 100));
  })();

  const tooFewWords = minWords !== undefined && stats.wordCount < minWords;
  const tooManyWords = maxWords !== undefined && stats.wordCount > maxWords;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Character Counter
      </h1>

      <TextInput
        onTextChange={handleTextChange}
        placeholder="Start typing your article..."
      />

      <StatsDisplay stats={stats} showReadingTime />

      {/* Word goal progress bar */}
      {maxWords !== undefined && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Word goal </span>
            <span>
              {stats.wordCount} / {maxWords} words
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 transition-all duration-300 ${
                tooManyWords ? "bg-red-500" : "bg-blue-500"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Feedback messages */}
      {tooFewWords && (
        <p className="mt-3 text-sm text-amber-600">
          Need at least {minWords} words. You have {stats.wordCount}.
        </p>
      )}
      {tooManyWords && (
        <p className="mt-3 text-sm text-red-600">
          Over the limit! Max is {maxWords} words.
        </p>
      )}
      {targetReadingTime !== undefined && stats.readingTime > targetReadingTime && (
        <p className="mt-1 text-sm text-gray-500">
          Estimated reading time: {stats.readingTime} min (target:{" "}
          {targetReadingTime} min)
        </p>
      )}
    </div>
  );
};