import { AnimationMixer, MeshToonMaterial } from "three";
import * as THREE from "three";

export class Player {
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

          // let newMat = new MeshToonMaterial(parameters);
          // child.material = newMat;
        }
        if (child.type === "SkinnedMesh") {
          child.frustumCulled = false;
          console.log(child.frustumCulled);
        }
      });

      this.modelMesh = glb.scene;
      console.log(glb.animations);
      if (info.tutorial) {
        this.modelMesh.position.z = 0;
        info.scene.add(this.modelMesh);
        this.speed = 3;
      } else if (info.start) {
        console.log(this.modelMesh);
        this.modelMesh.position.z = 190;
        this.modelMesh.position.y = 1.3;
        this.modelMesh.lookAt(0, 0, 200);

        info.scene.add(this.modelMesh);
      } else {
        this.modelMesh.position.z = -30.1;
        // this.modelMesh.position.y = 1.5;
        this.modelMesh.lookAt(0, 0, 10);
        console.log(this.modelMesh);
        // this.modelMesh.children[0].children[0].children[0].material.side =
        //   THREE.DoubleSide;
        this.modelMesh.children[0].children[0].children[0].material.depthTest = true;
        this.modelMesh.children[0].children[0].children[0].material.roughness = 0.8;
        this.modelMesh.children[0].children[0].children[0].material.transparent = true;
        this.modelMesh.children[0].children[0].children[1].material.transparent = true;
        // this.modelMesh.rotation.y = -Math.PI / 2;
        this.modelMesh.name = "model";
        // info.scene.add(this.modelMesh);
        this.box = new THREE.Box3().setFromObject(this.modelMesh);
      }

      // animation
      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
      this.actions[0].setLoop(THREE.LoopOnce);
      this.actions[1] = this.mixer.clipAction(glb.animations[1]);
      this.actions[2] = this.mixer.clipAction(glb.animations[2]);

      if (info.tutorial) {
        this.actions[2].play();
      }
    });
  }
}
