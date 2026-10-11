/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import { useEffect } from "react";
import { useVRM } from "@/hooks/useVRM";
import VRMRenderer from "./VRMRenderer";

type Props = {
  url?: string;
  onReady?: (
    speak: (text: string) => void,
    setEmotion: (emotion: string) => void
  ) => void;
  onError?: (message: string) => void;
};

export default function AvatarLoader({ url, onReady, onError }: Props) {
  const avatarUrl = url ?? `${import.meta.env.BASE_URL}models/gothic-avatar.vrm`;
  const { vrm, loading, error } = useVRM(avatarUrl);

  // Surface errors to the parent (AvatarCanvas) for visible display
  useEffect(() => {
    if (error) onError?.(error);
  }, [error]);

  if (loading) return <mesh />; // keeps Suspense satisfied
  if (error || !vrm) return null;

  return <VRMRenderer vrm={vrm} onReady={onReady} />;
}

