# Character Counter

An interactive React + TypeScript component that shows live character count,
word count, and estimated reading time as you type.

## Features

- Real-time statistics (characters, words, reading time)
- Optional word-count goal with a progress bar
- Optional min/max word validation with feedback
- Accessible and responsive UI using Tailwind CSS
- Performance-optimized with `useCallback` and `useMemo`

## Getting Started

```bash
npm install
npm run dev
Open http://localhost:5173 in your browser.
```

## Project Structure

src/
  components/
    TextInput/TextInput.tsx
    StatsDisplay/StatsDisplay.tsx
    CharacterCounter/CharacterCounter.tsx
  types/index.ts
  App.tsx

## How Reading Time Is Calculated

We assume 200 words per minute (a common average) and round to one decimal.
Empty input → 0 min.

# REFLECTION
1. How did you handle state updates when the text changed?
  useState holds the text; useCallback keeps the change handler stable; useMemo recomputes stats only when text changes.
2. What considerations did you make when calculating reading time?
  Based on 200 WPM, rounded to 0.1 min, 0 for empty input.
3. How did you ensure the UI remained responsive during rapid text input?
  Stats derive from a single source of truth (text), and useMemo avoids redundant work during rapid input.
4. What challenges did you face when implementing the statistics calculations?
  Handling empty/whitespace-only input so that the counter didn't count one fake word, and capping the progress bar at 100%.
