/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { VRM } from "@pixiv/three-vrm";

export interface AvatarContext {
  vrm: VRM | null;
  setEmotions: (emotion: string) => void;
  triggerLipSync: (visemes: VisemeKeyframe[]) => void;
}

