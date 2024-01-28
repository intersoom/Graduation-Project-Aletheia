import * as THREE from "three";
import { mergeGeometries } from "../module/BufferGeometryUtils";

export class Cloud {
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
      this.modelMesh.scale.set(12, 8, 8);
      // this.modelMesh.scale.set(5, 5, 5);
      this.modelMesh.position.x = -50;
      this.modelMesh.position.z = -60;
      this.modelMesh.position.y = 8;
      // console.log(this.modelMesh);
      this.modelMesh.children[0].children[0].material.fog = false;
      this.modelMesh.children[0].children[0].material.transparent = true;
      this.modelMesh.children[0].children[0].material.opacity = 0.3;
      // this.modelMesh.children[0].children[0].children[0].children[0].children[0].material.fog = false;
      // this.modelMesh.children[0].children[0].children[0].children[0].children[1].material.fog = false;

      this.modelMesh2 = glb.scene.clone();
      // this.modelMesh2.scale.set(0.9, 0.5, 0.5);
      // this.modelMesh2.scale.set(5, 5, 5);
      this.modelMesh2.scale.set(12, 8, 8);
      this.modelMesh2.position.x = -30;
      this.modelMesh2.position.z = -63;
      this.modelMesh2.position.y = 6;

      info.scene.add(this.modelMesh);
      info.scene.add(this.modelMesh2);
    });
  }
}
