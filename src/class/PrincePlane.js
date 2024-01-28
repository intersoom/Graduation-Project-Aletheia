import { AnimationMixer } from "three";
import * as THREE from "three";

export class PrincePlane {
  constructor(info) {
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

      this.modelMesh.position.x = -31.5;
      this.modelMesh.position.z = -65;
      this.modelMesh.rotation.y = Math.PI;

      // info.scene.add(this.modelMesh);

      // animation
      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].setLoop(THREE.LoopOnce);
      this.actions[0].clampWhenFinished = true;

      console.log(this.actions[0]);
    });

    info.gltfLoader.load(info.modelSrc2, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.modelMesh2 = glb.scene;

      this.modelMesh2.position.x = -31.5;
      this.modelMesh2.position.y = -5;
      this.modelMesh2.position.z = -65;
      this.modelMesh2.rotation.y = Math.PI;

      info.scene.add(this.modelMesh2);
    });
  }
}
