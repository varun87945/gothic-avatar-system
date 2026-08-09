export function enableSpringBones(vrm: VRM) {
  if (!vrm?.springBoneManager) return;
  vrm.springBoneManager.setVisible(true);
}
