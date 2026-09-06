/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { useCallback } from "react";
import { VRM } from "@pixiv/three-vrm";

const ALL_EXPRESSIONS = [
  "happy",
  "sad",
  "angry",
  "relaxed",
  "surprised",
];

const EXPRESSION_MAP: Record<string, string> = {
  // Main emotions
  happy: "happy",
  sad: "sad",
  angry: "angry",
  surprised: "surprised",

  // Secondary emotions
  shy: "relaxed",
  sleepy: "relaxed",
  confused: "surprised",

  // Animation-linked emotions
  clapping: "happy",
  goodbye: "happy",
  jump: "surprised",
  lookaround: "surprised",

  dancing: "happy",
  greeting: "happy",
  pose: "relaxed",
  showfullbody: "relaxed",

  spin: "happy",
  shoot: "angry",
  peacesign: "happy",

  neutral: "neutral",
};

export const useEmotion = (vrm: VRM | null) => {
  const setEmotion = useCallback(
    (emotion: string) => {
      if (!vrm?.expressionManager) return;

      // Reset all expressions
      ALL_EXPRESSIONS.forEach((name) => {
        try {
          vrm.expressionManager!.setValue(name, 0);
        } catch (err) {
          console.warn(`Failed to reset expression: ${name}`, err);
        }
      });

      const key = emotion.trim().toLowerCase();
      const target = EXPRESSION_MAP[key] ?? "neutral";

      if (target !== "neutral") {
        try {
          vrm.expressionManager.setValue(target, 1.0);
        } catch (err) {
          console.warn(`Expression not found: ${target}`, err);
        }
      }

      console.log(
        `[Emotion] Input: ${emotion} | Applied: ${target}`
      );
    },
    [vrm]
  );

  return { setEmotion };
};
