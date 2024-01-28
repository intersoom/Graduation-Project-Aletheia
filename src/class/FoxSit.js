import * as THREE from "three";
export class FoxSit {
  constructor(info) {
    this.name = info.name;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          // child.castShadow = true;
        }
      });

      // this.modelMesh.position.z = -10;

      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(2.1, 2.1, 2.1);

      this.modelMesh.position.x = 2;
      this.modelMesh.position.y = -5.6;
      this.modelMesh.position.z = 12;

      this.modelMesh.rotation.x = Math.PI / 18;

      this.modelMesh.rotation.y = -Math.PI;

      this.actions = [];
      console.log(glb.animations);

      this.mixer = new THREE.AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      this.actions[2] = this.mixer.clipAction(glb.animations[2]);
      this.actions[1].clampWhenFinished = true;
      this.actions[1].setLoop(THREE.LoopOnce);
      // info.scene.add(this.modelMesh);
    });
  }
}
