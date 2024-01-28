import { AnimationMixer } from "three";
import * as THREE from "three";

export class Picture {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene;
      this.modelMaterial = glb.scene.children[0].children[0].material;
      this.modelMesh.children[0].children[0].name = "picture";
      this.modelMesh.scale.set(17, 17, 17);
      this.modelMesh.position.z = -30;
      this.modelMesh.position.x = 7;
      this.modelMesh.position.y = -1;

      info.scene.add(this.modelMesh);
    });
  }
}
