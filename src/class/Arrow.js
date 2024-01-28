import { AnimationMixer } from "three";
import * as THREE from "three";

export class Arrow {
  constructor(info) {
    this.moving = false;
    this.movingDone = false;
    this.name = info.name;
    this.speed = 5;
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        // console.log("child", child);
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(2.3, 2.3, 2.3);

      info.scene.add(this.modelMesh);

      this.modelMesh.position.x = 5;
      this.modelMesh.position.z = 4;

      this.modelMesh.rotation.y = -Math.PI / 2;

      this.modelMesh2 = this.modelMesh.clone();

      this.modelMesh2.position.x = 47;
      this.modelMesh2.position.z = 30;

      info.scene.add(this.modelMesh2);

      this.modelMesh2.rotation.y = -Math.PI / 2;
    });
  }
}
