import { Group } from "three";
import { AnimationMixer } from "three";
import * as THREE from "three";

export class Myomok {
  constructor(info) {
    info.gltfLoader.load(info.princeModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          // child.frustumCulled = false;
        }
      });

      this.princeModelMesh = glb.scene;
      this.princeModelMesh.children[0].children[0].name = "prince";
      // this.princeModelMesh.scale.set(17, 17, 17);
      console.log(this.princeModelMesh);
      // this.modelMesh.children[0].children[0].children[0].material.roughness = 0.8;

      this.princeModelMesh.position.x = 20;
      this.princeModelMesh.position.y = 0;
      this.princeModelMesh.position.z = 16;

      this.actions = [];
      console.log(this.princeModelMesh);
      this.princeMixer = new AnimationMixer(this.princeModelMesh);
      this.actions[0] = this.princeMixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
      this.actions[0].setLoop(THREE.LoopOnce);

      this.actions[1] = this.princeMixer.clipAction(glb.animations[1]);
      this.actions[1].clampWhenFinished = true;
      this.actions[1].setLoop(THREE.LoopOnce);
      this.actions[2] = this.princeMixer.clipAction(glb.animations[2]);

      // this.actions[0].play();

      this.princeGroup = new Group();
      this.princeGroup.add(this.princeModelMesh);
      // this.princeGroup.rotateX(Math.PI / 2);
      // console.log(glb);
      // info.scene.add(this.princeModelMesh);
    });

    info.gltfLoader.load(info.treeModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.treeModelMesh = glb.scene;
      console.log(glb.animations);
      // this.treeModelMesh.scale.set(17, 17, 17);

      this.treeModelMesh.position.x = 20;
      this.treeModelMesh.position.y = 0;
      this.treeModelMesh.position.z = 16;

      this.actions2 = [];

      this.treeMixer = new AnimationMixer(this.treeModelMesh);
      this.actions2[0] = this.treeMixer.clipAction(glb.animations[0]);
      this.actions2[0].clampWhenFinished = true;
      this.actions2[0].setLoop(THREE.LoopOnce);

      this.actions2[1] = this.treeMixer.clipAction(glb.animations[1]);
      this.actions2[1].clampWhenFinished = true;
      this.actions2[1].setLoop(THREE.LoopOnce);
      this.actions2[2] = this.treeMixer.clipAction(glb.animations[2]);

      info.scene.add(this.treeModelMesh);
    });

    info.gltfLoader.load(info.sweatModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.sweatModelMesh = glb.scene;
      console.log(this.sweatModelMesh);
      this.sweatMaterial1 =
        this.sweatModelMesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].material;
      this.sweatMaterial2 =
        this.sweatModelMesh.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].material;

      this.sweatMaterial1.transparent = true;
      this.sweatMaterial2.transparent = true;
      this.sweatMaterial1.opacity = 0;
      this.sweatMaterial2.opacity = 0;

      this.sweatModelMesh.position.x = 20;
      this.sweatModelMesh.position.y = 0;
      this.sweatModelMesh.position.z = 16;

      this.actions3 = [];

      this.sweatMixer = new AnimationMixer(this.sweatModelMesh);
      this.actions3[0] = this.sweatMixer.clipAction(glb.animations[0]);
      this.actions3[0].play();
      info.scene.add(this.sweatModelMesh);
    });
  }
}
