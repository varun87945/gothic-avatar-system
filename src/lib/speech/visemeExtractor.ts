/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { textToVisemes } from "./../vrm/visemes";
import { VisemeKeyframe } from "@/types/visemes";

/**
 * Returns a timestamped list of visemes for a given utterance.
 * The SpeechSynthesis API does not expeaceSign phoneme timing.
 * We approximate using an even split based on word count.
 */
export function generateVisemeTimeline(text: string, duration: number): VisemeKeyframe[] {
  const base = textToVisemes(text);
  // Scale timestamps so the final entry ends at `duration`.
  const scale = duration / (base[base.length - 1]?.time ?? duration);
  return base.map((v) => ({
    time: v.time * scale,
    viseme: v.viseme as any
  }));
}

