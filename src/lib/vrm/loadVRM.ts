/**
 * loadVRM.ts
 *
 * ── Feet-at-zero normalization ───────────────────────────────────────────────
 *  VRM spec says the model origin is between the feet, but not all VRM files
 *  respect this strictly.  We compute the bounding box AFTER all transforms
 *  are applied, then shift the scene so bbox.min.y == 0.
 *
 *  This guarantees the avatar's feet land exactly at world y = 0, which is
 *  where the grid now sits (Environment.tsx).  Without this, even a small
 *  offset in the source file can make the avatar float or sink.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRM } from "@pixiv/three-vrm";
import * as THREE from "three";

export async function loadVRM(url: string): Promise<VRM> {
  const loader = new GLTFLoader();

  // Register the VRM plugin
  loader.register((parser) => new VRMLoaderPlugin(parser));

  const gltf = await loader.loadAsync(url);

  const vrm: VRM | undefined = gltf.userData.vrm;

  if (!vrm) {
    throw new Error(
      `VRM data not found in ${url}. Make sure the file is a valid VRM model.`
    );
  }

  // Rotate the model 180° — VRM models face away from camera by default
  vrm.scene.rotation.y = Math.PI;

  // ── Pin feet to y = 0 ────────────────────────────────────────────────────
  // Force all world matrices to update so the bounding box is accurate.
  vrm.scene.updateWorldMatrix(true, true);

  const bbox = new THREE.Box3().setFromObject(vrm.scene);

  // Only adjust if the feet are meaningfully off from y = 0
  if (Math.abs(bbox.min.y) > 0.001) {
    vrm.scene.position.y -= bbox.min.y;
  }
  // ─────────────────────────────────────────────────────────────────────────

  return vrm;
}