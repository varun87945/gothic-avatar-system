/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { useEffect, useRef } from "react";
import { VRM } from "@pixiv/three-vrm";
import { BLINK_INTERVAL } from "@/lib/utils/constants";

export const useBlink = (vrm: VRM | null) => {
  const timeoutRef = useRef<number>();

  useEffect(() => {
    // v2: expressionManager replaces vrm.blink
    if (!vrm?.expressionManager) return;

    const blink = () => {
      vrm.expressionManager?.setValue("blink", 1);
      // Hold blink for 150ms then open
      setTimeout(() => vrm.expressionManager?.setValue("blink", 0), 150);

      timeoutRef.current = window.setTimeout(
        blink,
        BLINK_INTERVAL * 1000 + Math.random() * 2000
      );
    };

    blink();
    return () => clearTimeout(timeoutRef.current);
  }, [vrm]);
};

