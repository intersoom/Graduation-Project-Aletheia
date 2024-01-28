import * as THREE from "three";
export class ShootingStar {
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
      console.log(this.modelMesh);

      this.modelMaterial = this.modelMesh.children[0].children[0].material;

      this.modelMaterial.transparent = true;
      this.modelMesh.scale.set(5, 5, 5);
      this.modelMesh.position.x = -2;
      this.modelMesh.position.y = 2;
      this.modelMesh.position.z = -2.6;
      // this.modelMesh.rotation.y = -Math.PI / 2;
      // this.modelMesh.rotation.x = Math.PI / 2;
      // this.modelMesh.rotation.z = Math.PI / 6;

      // this.actions = [];
      // console.log(glb.animations);

      // this.mixer = new THREE.AnimationMixer(this.modelMesh);

      // this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      // this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      // this.actions[2] = this.mixer.clipAction(glb.animations[2]);
      // this.actions[0].clampWhenFinished = true;
      // this.actions[0].setLoop(THREE.LoopOnce);

      // info.scene.add(this.modelMesh);
    });
  }
}
