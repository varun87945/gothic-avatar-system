import { EffectComposer, Bloom } from "@react-three/postprocessing";

export function BloomEffect() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.25}
        luminanceThreshold={0.75}
        luminanceSmoothing={0.35}
      />
    </EffectComposer>
  );
}