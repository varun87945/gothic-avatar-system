/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
declare module "@pixiv/three-vrm" {
  import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
  export class VRM extends GLTF {
    humanoid?: any;
    expressionManager?: any;
    springBoneManager?: any;
    blendShapeProxy?: any;
    // further properties are intentionally omitted for brevity
  }
}

