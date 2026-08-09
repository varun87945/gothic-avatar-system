import { MutableRefObject, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { VRM, VRMHumanBoneName } from "@pixiv/three-vrm";

export function useIdleMotion(
  vrm: VRM | null,
  introPhase?: MutableRefObject<string>
) {
  const t = useRef(0);
  const initialised = useRef(false);

  useEffect(() => {
    if (!vrm || initialised.current) return;
    initialised.current = true;

    const setBone = (name: VRMHumanBoneName, x: number, y: number, z: number) => {
      const node = vrm.humanoid.getNormalizedBoneNode(name);
      if (!node) return;
      node.rotation.set(x, y, z);
    };

    setBone(VRMHumanBoneName.LeftUpperArm, 0, 0, 1.1);
    setBone(VRMHumanBoneName.RightUpperArm, 0, 0, -1.1);
    setBone(VRMHumanBoneName.LeftLowerArm, 0, 0, 0.25);
    setBone(VRMHumanBoneName.RightLowerArm, 0, 0, -0.25);
    setBone(VRMHumanBoneName.LeftHand, 0, 0, 0.08);
    setBone(VRMHumanBoneName.RightHand, 0, 0, -0.08);
  }, [vrm]);

  useFrame((_state, delta) => {
    if (!vrm) return;

    // If intro/walk/wave/VRMA is active, do not fight it.
    if (introPhase && introPhase.current !== "idle") return;

    t.current += delta;
    const time = t.current;

    const getBone = (name: VRMHumanBoneName) =>
      vrm.humanoid.getNormalizedBoneNode(name);

    const breathe = Math.sin(time * 0.9) * 0.018;

    const chest = getBone(VRMHumanBoneName.Chest);
    const spine = getBone(VRMHumanBoneName.Spine);
    const hips = getBone(VRMHumanBoneName.Hips);
    const neck = getBone(VRMHumanBoneName.Neck);
    const head = getBone(VRMHumanBoneName.Head);

    if (chest) {
      chest.rotation.x = breathe;
      chest.rotation.z = Math.sin(time * 0.55) * 0.01;
    }

    if (spine) {
      spine.rotation.x = breathe * 0.45;
      spine.rotation.z = Math.sin(time * 0.5) * 0.008;
    }

    // Rotate only. Do NOT animate hips.position.
    if (hips) {
      hips.rotation.y = Math.sin(time * 0.35) * 0.018;
      hips.rotation.z = Math.sin(time * 0.45) * 0.012;
    }

    if (neck) {
      neck.rotation.y = Math.sin(time * 0.4) * 0.018;
      neck.rotation.x = Math.sin(time * 0.5) * 0.01;
    }

    if (head) {
      head.rotation.y = Math.sin(time * 0.45) * 0.04;
      head.rotation.x = Math.sin(time * 0.35) * 0.018 - breathe * 0.25;
      head.rotation.z = Math.sin(time * 0.3) * 0.01;
    }

    const lArm = getBone(VRMHumanBoneName.LeftUpperArm);
    const rArm = getBone(VRMHumanBoneName.RightUpperArm);
    const lForearm = getBone(VRMHumanBoneName.LeftLowerArm);
    const rForearm = getBone(VRMHumanBoneName.RightLowerArm);

    if (lArm) {
      lArm.rotation.z = 1.1 + Math.sin(time * 0.55) * 0.018;
      lArm.rotation.x = Math.sin(time * 0.45) * 0.012;
    }

    if (rArm) {
      rArm.rotation.z = -1.1 + Math.sin(time * 0.55 + Math.PI) * 0.018;
      rArm.rotation.x = Math.sin(time * 0.45 + Math.PI) * 0.012;
    }

    if (lForearm) {
      lForearm.rotation.z = 0.25 + Math.sin(time * 0.5) * 0.012;
    }

    if (rForearm) {
      rForearm.rotation.z = -0.25 + Math.sin(time * 0.5 + Math.PI) * 0.012;
    }
  });
}