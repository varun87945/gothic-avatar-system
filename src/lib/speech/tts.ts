/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { SpeechRequest } from "@/types/speech";

export async function speak(
  { text, voice, rate = 1, pitch = 1 }: SpeechRequest,
  onEnd: () => void,
  onError?: (e: any) => void
) {
  return new Promise<void>((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onend = () => {
      onEnd();
      resolve();
    };
    utterance.onerror = (e) => {
      onError?.(e);
      resolve();
    };
    speechSynthesis.speak(utterance);
  });
}

