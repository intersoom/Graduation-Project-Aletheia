import { AnimationMixer } from "three";
import * as THREE from "three";

export class Airplane {
  constructor(info) {
    this.airPlaneDone = false;
    this.angle = 0;
    this.angleSpeed = 0.03;
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene;
      this.modelMesh.name = "airplane";
      console.log(this.modelMesh);
      // this.modelMesh.scale.set(0.5, 0.5, 0.5);
      // this.modelMesh.rotation.y = -Math.PI / 3;
      this.modelMesh.position.z = -30;
      this.modelMesh.position.y = 12;
      // this.modelMesh.position.y = 12;

      this.modelMesh.children[0].children[0].material.roughness = 0.6;

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);
      console.log(glb.animations);
      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
      this.actions[0].setLoop(THREE.LoopOnce);

      info.scene.add(this.modelMesh);
    });
  }
}
