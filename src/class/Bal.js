import * as THREE from "three";

export class Bal {
  constructor(info) {
    this.name = info.name;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      // this.modelMesh.position.z = -10;

      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(2, 2, 2);
      this.modelMesh.position.y = 1;

      // info.scene.add(this.modelMesh);
    });
  }
}
