import { useEffect } from "react";
import { useVRM } from "@/hooks/useVRM";
import VRMRenderer from "./VRMRenderer";

type Props = {
  onReady?: (
    speak: (text: string) => void,
    setEmotion: (emotion: string) => void
  ) => void;
  onError?: (message: string) => void;
};

export default function AvatarLoader({ onReady, onError }: Props) {
  const { vrm, loading, error } = useVRM("/models/gothic-avatar.vrm");

  // Surface errors to the parent (AvatarCanvas) for visible display
  useEffect(() => {
    if (error) onError?.(error);
  }, [error]);

  if (loading) return <mesh />; // keeps Suspense satisfied
  if (error || !vrm) return null;

  return <VRMRenderer vrm={vrm} onReady={onReady} />;
}
