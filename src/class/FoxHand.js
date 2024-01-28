import { AnimationMixer } from "three";
import * as THREE from "three";

export class FoxHand {
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
          child.frustumCulled = false;
        }
      });

      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(1.3, 1.3, 1.3);

      info.scene.add(this.modelMesh);

      this.modelMesh.position.x = -10;
      this.modelMesh.rotation.y = Math.PI / 2;

      // animation
      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      this.actions[2] = this.mixer.clipAction(glb.animations[2]);
      this.actions[3] = this.mixer.clipAction(glb.animations[3]);
      this.actions[3].setLoop(THREE.LoopOnce);
      this.actions[3].clampWhenFinished = true;
      this.actions[4] = this.mixer.clipAction(glb.animations[4]);
      this.actions[0].play();
    });
  }
}
