/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
import AvatarCanvasDemo from "../Avatar/AvatarCanvasDemo";

type Props = {
  onReady?: (
    speak: (text: string) => void,
    setEmotion: (emotion: string) => void
  ) => void;
};

export default function MainScene({ onReady }: Props) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <AvatarCanvasDemo onReady={onReady} />
    </div>
  );
}
