import { useEffect, useRef } from "react";
import { VRM } from "@pixiv/three-vrm";
import { VisemeKeyframe } from "@/types/visemes";

// VRM v2 mouth expression names (replaces "Mouth_A" etc. from v1)
const VISEME_TO_EXPRESSION: Record<string, string> = {
  A:    "aa",
  I:    "ih",
  U:    "ou",
  E:    "ee",
  O:    "oh",
};

const ALL_MOUTH = Object.values(VISEME_TO_EXPRESSION);

export const useLipSync = (vrm: VRM | null) => {
  const timelineRef   = useRef<VisemeKeyframe[]>([]);
  const startTimeRef  = useRef<number>(0);
  const rafRef        = useRef<number>();

  const play = (visemes: VisemeKeyframe[]) => {
    timelineRef.current  = visemes;
    startTimeRef.current = performance.now() / 1000;
    cancelAnimationFrame(rafRef.current!);
    rafRef.current = requestAnimationFrame(step);
  };

  const step = () => {
    // v2: vrm.expressionManager replaces vrm.blendShapeProxy
    if (!vrm?.expressionManager) return;

    const elapsed = performance.now() / 1000 - startTimeRef.current;
    const frame   = timelineRef.current.find((v) => v.time >= elapsed);

    // Reset all mouth shapes each frame
    ALL_MOUTH.forEach((name) => vrm.expressionManager?.setValue(name, 0));

    if (frame && frame.viseme !== "rest") {
      const target = VISEME_TO_EXPRESSION[frame.viseme];
      if (target) vrm.expressionManager.setValue(target, 1.5);
    }

    const lastTime =
      timelineRef.current[timelineRef.current.length - 1]?.time ?? 0;
    if (elapsed < lastTime + 0.2) {
      rafRef.current = requestAnimationFrame(step);
    }
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current!), []);

  return { play };
};
