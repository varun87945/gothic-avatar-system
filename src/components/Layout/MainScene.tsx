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