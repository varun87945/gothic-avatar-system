import { useEffect, useRef } from "react";
import { VRM } from "@pixiv/three-vrm";
import { Vector2, Vector3, Raycaster, PerspectiveCamera, Object3D } from "three";

export const useEyeTracking = (vrm: VRM | null, camera: PerspectiveCamera) => {
  const mouse = useRef(new Vector2());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!vrm?.lookAt) return;

    // v2 fix: vrm.lookAt.target must be an Object3D, not a raw Vector3.
    // The old code called vrm.lookAt.target.copy(vec) which fails because
    // target starts as null. Instead, create an Object3D, assign it once,
    // then move its position each frame.
    const targetObject = new Object3D();
    vrm.lookAt.target = targetObject;

    const raycaster = new Raycaster();
    const worldPos = new Vector3();
    let rafId: number;

    const tick = () => {
      raycaster.setFromCamera(mouse.current, camera);
      raycaster.ray.at(10, worldPos);
      targetObject.position.copy(worldPos); // copy onto the Object3D, not onto null
      rafId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      if (vrm.lookAt) vrm.lookAt.target = null;
    };
  }, [vrm, camera]);
};
