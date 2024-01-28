import * as THREE from "three";
import { mergeGeometries } from "../module/BufferGeometryUtils";

export class Cloud2 {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      this.modelMesh = glb.scene;
      // this.modelMesh.scale.set(0.9, 0.5, 0.5);
      this.modelMesh.scale.set(500, 300, 50);
      // this.modelMesh.scale.set(5, 5, 5);
      this.modelMesh.position.x = 0;
      this.modelMesh.position.z = -300;
      this.modelMesh.position.y = -10;
      // console.log(this.modelMesh);
      this.modelMesh.children[0].children[0].material.fog = false;
      this.modelMesh.children[0].children[0].material.transparent = true;
      this.modelMesh.children[0].children[0].material.opacity = 0.1;
      // this.modelMesh.children[0].children[0].children[0].children[0].children[0].material.fog = false;
      // this.modelMesh.children[0].children[0].children[0].children[0].children[1].material.fog = false;
      // info.scene.add(this.modelMesh);
    });
  }
}
