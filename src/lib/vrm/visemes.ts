export const visemeMap: Record<string, string> = {
  a: "A",
  i: "I",
  u: "U",
  e: "E",
  o: "O"
};

/**
 * Very naive phoneme → viseme extraction.
 * It works well enough for short sentences with the built‑in SpeechSynthesis.
 */
export function textToVisemes(text: string): { time: number; viseme: string }[] {
  const words = text.split(/\s+/);
  const totalDuration = Math.max(words.length * 0.25, 1); // guess 250 ms per word
  const step = totalDuration / words.length;
  const frames: { time: number; viseme: string }[] = [];

  words.forEach((word, i) => {
    const vowelMatch = word.match(/[aeiou]/i);
    const vowel = vowelMatch ? vowelMatch[0].toLowerCase() : "rest";
    const viseme = visemeMap[vowel] ?? "rest";
    frames.push({ time: i * step, viseme });
  });

  return frames;
}
