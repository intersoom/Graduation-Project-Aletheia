import * as THREE from "three";

export class Rose {
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
      this.modelMesh.scale.set(4, 4, 4);

      this.jooPosition = this.modelMesh.children[1].children[0].position;

      console.log(this.modelMesh.children[1].children[0].position);

      this.modelMesh.position.y = -5.8;
      this.modelMesh.position.z = -2.6;
      this.modelMesh.rotation.y = -Math.PI / 2;

      this.actions = [];

      this.mixer = new THREE.AnimationMixer(this.modelMesh);
      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
      this.actions[0].setLoop(THREE.LoopOnce);
      // this.actions[0].play();
      info.scene.add(this.modelMesh);
    });
  }
}
