/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { VRM } from "@pixiv/three-vrm";

import { useBlink } from "@/hooks/useBlink";
import { useEyeTracking } from "@/hooks/useEyeTracking";
import { useEmotion } from "@/hooks/useEmotion";
import { useLipSync } from "@/hooks/useLipSync";
import { useSpeech } from "@/hooks/useSpeech";
import { playVRMA } from "@/lib/vrm/vrmaPlayer";

const DEFAULT_IDLE = "/animations/idle_loop.vrma";

const VRMA_MAP: Record<string, string> = {
  happy: "/animations/Relax.vrma",
  sad: "/animations/Sad.vrma",
  angry: "/animations/Angry.vrma",
  shy: "/animations/Blush.vrma",
  sleepy: "/animations/Sleepy.vrma",
  confused: "/animations/Thinking.vrma",
  surprised: "/animations/Surprised.vrma",

  clapping: "/animations/Clapping.vrma",
  goodbye: "/animations/Goodbye.vrma",
  jump: "/animations/Jump.vrma",
  lookaround: "/animations/LookAround.vrma",

  dancing: "/animations/dance.vrma",
  greeting: "/animations/greeting.vrma",
  pose: "/animations/modelPose.vrma",
  showfullbody: "/animations/showFullBody.vrma",
  spin: "/animations/spin.vrma",
  shoot: "/animations/shoot.vrma",
  peacesign: "/animations/peaceSign.vrma",

  neutral: DEFAULT_IDLE,
};

type Props = {
  vrm: VRM;
  onReady?: (
    speak: (text: string) => void,
    setEmotion: (emotion: string) => void
  ) => void;
};

export default function VRMRenderer({ vrm, onReady }: Props) {
  const { camera } = useThree();
  const playId = useRef(0);

  useBlink(vrm);
  useEyeTracking(vrm, camera as any);

  const mixer = useMemo(() => new THREE.AnimationMixer(vrm.scene), [vrm]);

  const { setEmotion: setFaceEmotion } = useEmotion(vrm);
  const { play: playLipSync } = useLipSync(vrm);
  const { speak } = useSpeech(playLipSync);

  useEffect(() => {
    const manager: any = vrm.expressionManager;

    const expressionNames =
      manager?.expressions?.map((e: any) => e.expressionName ?? e.name) ??
      manager?._expressions?.map((e: any) => e.expressionName ?? e.name) ??
      [];

    console.log("Available VRM expressions:", expressionNames);
  }, [vrm]);

  const playBodyEmotion = useCallback(
    async (emotion: string) => {
      const id = ++playId.current;

      const key = emotion.trim().toLowerCase();
      const vrmaUrl = VRMA_MAP[key] ?? DEFAULT_IDLE;
      const isIdle = vrmaUrl === DEFAULT_IDLE;

      console.log("Body animation:", emotion, "=>", vrmaUrl);

      try {
        await playVRMA(vrm, mixer, vrmaUrl, isIdle);

        if (id !== playId.current) return;

        if (!isIdle) {
          const onFinished = () => {
            mixer.removeEventListener("finished", onFinished);

            if (id !== playId.current) return;

            void playBodyEmotion("neutral");
          };

          mixer.addEventListener("finished", onFinished);
        }
      } catch (error) {
        console.error("Failed to play VRMA:", vrmaUrl, error);
      }
    },
    [vrm, mixer]
  );

  const setEmotion = useCallback(
    (emotion: string) => {
      setFaceEmotion(emotion);
      void playBodyEmotion(emotion);
    },
    [setFaceEmotion, playBodyEmotion]
  );

  useEffect(() => {
    setFaceEmotion("neutral");
    void playBodyEmotion("neutral");

    return () => {
      mixer.stopAllAction();
    };
  }, [setFaceEmotion, playBodyEmotion, mixer]);

  useEffect(() => {
    onReady?.(
      (text) => speak({ text }),
      (emotion) => setEmotion(emotion)
    );
  }, [onReady, speak, setEmotion]);

  useFrame((_state, delta) => {
    mixer.update(delta);
    vrm.update(delta);
  });

 return (
  <group rotation={[0, Math.PI, 0]}>
    <primitive
      object={vrm.scene}
      position={[0, -0.15, 0]}
      scale={1.25}
    />
  </group>
);
}
