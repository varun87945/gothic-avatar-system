import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { VRM } from "@pixiv/three-vrm";
import {
  createVRMAnimationClip,
  VRMAnimationLoaderPlugin,
} from "@pixiv/three-vrm-animation";

const loader = new GLTFLoader();

loader.register((parser) => {
  return new VRMAnimationLoaderPlugin(parser);
});

export async function loadVRMAClip(vrm: VRM, url: string) {
  const gltf = await loader.loadAsync(url);
  const vrmAnimations = gltf.userData.vrmAnimations;

  if (!vrmAnimations || !vrmAnimations.length) {
    throw new Error(`No VRMA animation found: ${url}`);
  }

  return createVRMAnimationClip(vrmAnimations[0], vrm);
}

export async function playVRMA(
  vrm: VRM,
  mixer: THREE.AnimationMixer,
  url: string,
  loop = false
) {
  const clip = await loadVRMAClip(vrm, url);

  mixer.stopAllAction();

  const action = mixer.clipAction(clip);
  action.reset();

  if (loop) {
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = false;
  } else {
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = false;
  }

  action.fadeIn(0.15);
  action.play();

  return action;
}