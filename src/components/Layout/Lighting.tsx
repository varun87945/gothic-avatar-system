/*
 * Gothic Avatar System
 * Copyright © 2026 Varun. All Rights Reserved.
 *
 * This source code is proprietary.
 * Unauthorized copying, modification, distribution,
 * publication, or reuse is prohibited.
 */
export default function Lighting() {
  return (
    <>
      <ambientLight
        intensity={0.9}
        color="#ffffff"
      />

      <directionalLight
        position={[2, 4, 3]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />

      <pointLight
        position={[0, 1.8, 2.5]}
        intensity={1.4}
        color="#ffffff"
        distance={10}
      />

      <pointLight
        position={[0, 2, -3]}
        intensity={0.5}
        color="#a855f7"
        distance={12}
      />
    </>
  );
}
