import * as THREE from "three";
export class GrowFlower {
  constructor(info) {
    this.name = info.name;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.modelMesh = glb.scene;
      console.log(this.modelMesh);

      this.modelMesh.position.x = 0;
      // this.modelMesh.position.y = 2;
      this.modelMesh.position.z = 16;
      this.modelMesh.rotation.y = -Math.PI / 2;

      this.actions = [];
      console.log(glb.animations);

      this.mixer = new THREE.AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      this.actions[2] = this.mixer.clipAction(glb.animations[2]);
      this.actions[3] = this.mixer.clipAction(glb.animations[3]);
      this.actions[4] = this.mixer.clipAction(glb.animations[4]);
      this.actions[1].clampWhenFinished = true;
      this.actions[1].setLoop(THREE.LoopOnce);
      this.actions[2].clampWhenFinished = true;
      this.actions[2].setLoop(THREE.LoopOnce);
      this.actions[3].clampWhenFinished = true;
      this.actions[3].setLoop(THREE.LoopOnce);
      this.actions[4].clampWhenFinished = true;
      this.actions[4].setLoop(THREE.LoopOnce);
      // this.actions[0].play();
      // info.scene.add(this.modelMesh);
    });

    info.gltfLoader.load(info.flowerModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.flowerModelMesh = glb.scene;
      console.log(this.flowerModelMesh);

      this.flowerModelMesh.position.x = -2.7;
      this.flowerModelMesh.position.z = 16;
      this.flowerModelMesh.rotation.y = -Math.PI / 2;

      this.flowerMaterial =
        this.flowerModelMesh.children[0].children[0].children;
      this.red =
        this.flowerModelMesh.children[0].children[0].children[0].material.color.r;
      this.flowerMaterial.forEach((element) => {
        element.material.color.r = 0.0;
        element.material.color.g = 0.0;
        element.material.color.b = 0.0;
      });

      this.flowerActions = [];
      console.log(glb.animations);

      this.flowerMixer = new THREE.AnimationMixer(this.flowerModelMesh);

      this.flowerActions[0] = this.flowerMixer.clipAction(glb.animations[0]);
      // this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      // this.actions[2] = this.mixer.clipAction(glb.animations[2]);
      this.flowerActions[0].clampWhenFinished = true;
      this.flowerActions[0].setLoop(THREE.LoopOnce);
      // this.actions[0].play();
      info.scene.add(this.flowerModelMesh);
    });
  }
}
