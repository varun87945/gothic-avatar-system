/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { Suspense, useState } from "react";

import AvatarLoader from "../Avatar/AvatarLoader";
import Lighting from "../Layout/Lighting";
import { BloomEffect } from "../Layout/Effects/BloomEffect";
import TalkBox from "../UI/TalkBox";
import BottomBar from "../UI/BottomBar";

const CAM_Z = 3.6;
const CAM_Y = 1.15;
const CAM_FOV = 30;
const LOOK_AT_Y = 1.05;

type Props = {
  onReady?: (
    speak: (text: string) => void,
    setEmotion: (emotion: string) => void
  ) => void;
};

function Environment3D() {
  const { scene } = useGLTF("/models/environment.glb");

  return (
    <primitive
      object={scene}
      position={[-1.05, 0.25, -2]}
      rotation={[0, -Math.PI/2, 0]}
      scale={2}
    />
  );
}

export default function AvatarCanvasDemo({ onReady }: Props) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [speakFn, setSpeakFn] = useState<((text: string) => void) | null>(null);
  const [emotionFn, setEmotionFn] = useState<
    ((emotion: string) => void) | null
  >(null);

  const handleReady = (
    speak: (text: string) => void,
    setEmotion: (emotion: string) => void
  ) => {
    setSpeakFn(() => speak);
    setEmotionFn(() => setEmotion);
    setStatus("ready");
    onReady?.(speak, setEmotion);
  };

  const handleError = (message: string) => {
    setErrorMsg(message);
    setStatus("error");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#222222",
      }}
    >
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: "#222222",
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0, CAM_Y, CAM_Z]}
          fov={CAM_FOV}
          near={0.05}
          far={100}
          onUpdate={(cam) => cam.lookAt(0, LOOK_AT_Y, 0)}
        />

        <OrbitControls
          target={[0, LOOK_AT_Y, 0]}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          zoomSpeed={0.6}
          panSpeed={0.5}
          minDistance={1.8}
          maxDistance={7}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI / 2}
        />

        <Suspense fallback={null}>
          <Environment3D />

          <group rotation={[0, Math.PI, 0]}>
            <AvatarLoader onReady={handleReady} onError={handleError} />
          </group>

          <Lighting />
          <BloomEffect />
        </Suspense>
      </Canvas>

      {status === "loading" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              color: "#a78bfa",
              fontSize: 14,
              fontFamily: "monospace",
            }}
          >
            Loading avatar...
          </div>
        </div>
      )}

      {status === "error" && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.9)",
            border: "1px solid #ef4444",
            borderRadius: 8,
            padding: "10px 16px",
            color: "#f87171",
            fontSize: 12,
            zIndex: 200,
          }}
        >
          {errorMsg ?? "Unknown error"}
        </div>
      )}

      {status === "ready" && (
        <BottomBar>
          <TalkBox
            onSpeak={(text) => speakFn?.(text)}
            onEmotion={(emotion) => emotionFn?.(emotion)}
          />
        </BottomBar>
      )}
    </div>
  );
}

useGLTF.preload("/models/environment.glb");
