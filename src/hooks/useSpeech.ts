/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { useCallback, useRef } from "react";
import { SpeechQueue } from "@/lib/speech/speechQueue";
import { SpeechRequest } from "@/types/speech";
import { VisemeKeyframe } from "@/types/visemes";

export const useSpeech = (onVisemes: (v: VisemeKeyframe[]) => void) => {
  const queueRef = useRef(new SpeechQueue());

  const speak = useCallback(
    (request: SpeechRequest) => {
      queueRef.current.enqueue({ request, onVisemes });
    },
    [onVisemes]
  );

  return { speak };
};

