import { AnimationMixer, Group } from "three";
import * as THREE from "three";
import { Water } from "three/addons/objects/Water.js";

export class BackObjects {
  constructor(info) {
    const textureLoader = new THREE.TextureLoader();
    // const waterGeometry = new THREE.PlaneGeometry(5, 5);

    // info.scene.add(water);
    // 나무
    info.gltfLoader.load(info.oasisModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      this.treeModelMesh = glb.scene;

      this.treeModelMesh.scale.set(15, 15, 15);
      this.treeModelMesh.scale.set(15, 15, 15);
      this.treeModelMesh.position.z = -37.5;
      this.treeModelMesh.position.x = 13.5;
      this.treeModelMesh.position.y = -0.09;

      this.actions = [];

      this.mixer = new AnimationMixer(this.treeModelMesh);
      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      info.scene.add(this.treeModelMesh);
      this.actions[0].play();
    });

    // 돌
    info.gltfLoader.load(info.rockModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      this.rockModelMesh = glb.scene;
      this.rockModelMesh.scale.set(12, 12, 12);
      this.rockModelMesh.rotation.y = Math.PI;
      this.rockModelMesh.position.x = 12.5;
      this.rockModelMesh.position.y = -0.09;
      this.rockModelMesh.position.z = -37.8;
      info.scene.add(this.rockModelMesh);
    });

    // 선인장
    info.gltfLoader.load(info.cactusModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      this.modelMesh = glb.scene;
      this.cactus2 = glb.scene.clone();

      this.modelMesh.name = "cactus";
      this.modelMesh.scale.set(1, 1, 1);
      this.cactus2.scale.set(0.7, 0.7, 0.7);
      this.cactus2.rotation.y = -Math.PI / 9;

      this.modelMesh.position.z = 0.5;
      this.modelMesh.position.x = 0;
      this.modelMesh.position.y = -0.09;

      this.cactus2.position.z = 0;
      this.cactus2.position.x = 0.6;
      this.cactus2.position.y = -0.09;

      this.cactuses = new Group();
      this.cactuses.add(this.cactus2, this.modelMesh);
      // info.scene.add(this.cactuses);

      this.cactuses.position.x = 10;
      this.cactuses.position.y = -0.09;
      this.cactuses.position.z = -2;

      this.cactuses2 = this.cactuses.clone();
      this.cactuses2.rotation.y = Math.PI / 9;
      this.cactuses2.position.z = -30;
      this.cactuses2.position.x = -9;

      this.cactus3 = this.modelMesh.clone();
      this.cactus3.position.z = -15;
      this.cactus3.position.x = 10;

      info.scene.add(this.cactuses2);
      info.scene.add(this.cactus3);
    });

    // 물
    info.gltfLoader.load(info.waterModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(8, 8, 8);
      this.modelMesh.children[0].children[0].children[0].material.transparent = true;
      this.modelMesh.children[0].children[0].children[0].material.opacity = 0.6;
      console.log(this.modelMesh);
      info.scene.add(this.modelMesh);
    });
  }
}
