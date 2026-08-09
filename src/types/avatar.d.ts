import { VRM } from "@pixiv/three-vrm";

export interface AvatarContext {
  vrm: VRM | null;
  setEmotions: (emotion: string) => void;
  triggerLipSync: (visemes: VisemeKeyframe[]) => void;
}
