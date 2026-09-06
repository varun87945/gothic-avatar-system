/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
export function enableSpringBones(vrm: VRM) {
  if (!vrm?.springBoneManager) return;
  vrm.springBoneManager.setVisible(true);
}

