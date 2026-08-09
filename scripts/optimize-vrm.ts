// scripts/optimize-vrm.ts
import { loadVRM } from "@/lib/vrm/loadVRM";
import fs from "fs";

async function main() {
  const vrm = await loadVRM("./public/models/gothic-avatar.vrm");
  // Simulate optimisation – you could drop unused meshes, compress textures, etc.
  console.log("VRM loaded – ready for optimisation (placeholder)");
}
main();
