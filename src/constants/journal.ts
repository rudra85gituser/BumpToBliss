import journalImage from "@/src/assets/journal/card-image.png";

export const journal = {
  journalImage
}

export type MoodOption = {
  label: string;
  emoji: string;
};

export const MOOD_OPTIONS: MoodOption[] = [
  { label: "Calm", emoji: "😌" },
  { label: "Irritated", emoji: "😠" },
  { label: "Happy", emoji: "😊" },
  { label: "Anxious", emoji: "😰" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😡" },
  { label: "Meh", emoji: "😕" },
  { label: "Don't Know", emoji: "🤷" },
  { label: "Worried", emoji: "😟" },
];

export const getMoodEmoji = (mood: string): string =>
  MOOD_OPTIONS.find((option) => option.label === mood)?.emoji ?? "🙂";

export type JournalEntry = {
  id: string;
  date: string;
  title: string;
  mood: string;
  image?: string | null;
  notes: string;
  created_at?: string;
};