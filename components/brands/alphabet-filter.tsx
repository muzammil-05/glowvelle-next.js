"use client";

import {
  ALPHABET_FILTER_LETTERS,
  type AlphabetFilterLetter,
} from "@/lib/brands/utils";

type AlphabetFilterProps = {
  activeLetter: AlphabetFilterLetter;
  onLetterChange: (letter: AlphabetFilterLetter) => void;
};

export function AlphabetFilter({
  activeLetter,
  onLetterChange,
}: AlphabetFilterProps) {
  return (
    <div
      className="mb-10 flex flex-wrap gap-1.5"
      role="group"
      aria-label="Filter brands by letter"
    >
      {ALPHABET_FILTER_LETTERS.map((letter) => {
        const isActive = activeLetter === letter;

        return (
          <button
            key={letter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onLetterChange(letter)}
            className={`h-9 w-9 rounded-xl font-sans text-[12px] font-bold transition-all ${
              isActive
                ? "bg-[#FF5FA2] text-white shadow-md shadow-[#FF5FA2]/30"
                : "border border-[#FFD6E8] bg-white text-[#9B8B97] hover:border-[#FF5FA2] hover:text-[#FF5FA2] dark:border-[#3A2530] dark:bg-[#2A1520]"
            }`}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
