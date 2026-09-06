/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { VRM } from "@pixiv/three-vrm";

/**
 * Set a blend shape / expression value via the v2 expressionManager API.
 * Falls back through a list of common name aliases so the call works across
 * different VRM models without throwing.
 *
 * @param vrm        - The loaded VRM instance
 * @param shapeName  - Primary expression name to try first (e.g. "happy")
 * @param aliases    - Fallback names if the primary is not found (e.g. ["Joy", "smile"])
 * @param value      - Weight in [0, 1]
 */
export function setBlendShapeValue(
  vrm: VRM,
  shapeName: string,
  value: number,
  aliases: string[] = []
): void {
  const em = vrm.expressionManager;
  if (!em) return;

  for (const name of [shapeName, ...aliases]) {
    try {
      em.setValue(name, value);
      return; // first match wins
    } catch { /* name not present on this model â€” try next */ }
  }
}

// â”€â”€ Convenience wrappers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const Expressions = {
  smile:  (vrm: VRM, v: number) => setBlendShapeValue(vrm, "happy",   v, ["Happy", "joy", "Joy", "smile", "Smile"]),
  blink:  (vrm: VRM, v: number) => setBlendShapeValue(vrm, "blink",   v, ["Blink", "blinkLeft", "blinkRight"]),
  angry:  (vrm: VRM, v: number) => setBlendShapeValue(vrm, "angry",   v, ["Angry"]),
  sad:    (vrm: VRM, v: number) => setBlendShapeValue(vrm, "sad",     v, ["Sad"]),
  neutral:(vrm: VRM, v: number) => setBlendShapeValue(vrm, "neutral", v, ["Neutral"]),
  surprised:(vrm: VRM, v: number) => setBlendShapeValue(vrm, "surprised", v, ["Surprised", "Brow"]),
} as const;
