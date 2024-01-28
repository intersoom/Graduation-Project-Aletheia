import { AnimationMixer } from "three";
import * as THREE from "three";

export class Bao {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      this.crownBool = false;

      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene;
      info.meshes.push(this.modelMesh);
      // glb.scene.children[0].children[0].material.opacity = 0;
      // glb.scene.children[0].children[0].material.transparent = true;
      this.modelMaterial = glb.scene.children[0].children[0].material;
      this.modelMesh.children[0].children[0].name = "bao";
      this.modelMesh.scale.set(3.2, 3.2, 3.2);
      this.modelMesh.position.z = 12;
      this.modelMesh.position.x = 22;
      // this.modelMesh.rotation.y = -Math.PI / 2;

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);
      console.log(glb.animations);
      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      this.actions[2] = this.mixer.clipAction(glb.animations[2]);
      this.actions[1].clampWhenFinished = true;
      this.actions[1].setLoop(THREE.LoopOnce);
      this.actions[0].play();
      info.scene.add(this.modelMesh);
    });
  }
}
