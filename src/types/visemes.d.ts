/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
export type Viseme = "A" | "I" | "U" | "E" | "O" | "rest";
export interface VisemeKeyframe {
  time: number; // seconds since utterance start
  viseme: Viseme;
}

