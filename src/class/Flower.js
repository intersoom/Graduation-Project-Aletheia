import { Capsule } from "@react-three/drei";
import { AnimationMixer } from "three";
import * as THREE from "three";

export class Flower {
  constructor(info) {
    this.flowers = new THREE.Group();
    this.boxFlowers = new THREE.Group();
    // object 구성 -> {{modelMesh, position: [x, y, z]}}
    this.flowerMeshes = [];
    this.flowerBoxMeshes = [];
    this.flowerMixers = [];
    this.flowerActions = [];

    info.gltfLoader.load(info.pinkModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.pinkPosArr = [
        { x: 1, z: 0 },
        { x: 3, z: 0 },
        { x: 1, z: 1 },
        { x: 4, z: 1 },
        { x: 3, z: 2 },
        { x: 1, z: 3 },
        { x: 4, z: 3 },
        { x: 2, z: 4 },
      ];

      this.pinkModelMesh = glb.scene;
      this.pinkModelMesh.name = "flower";
      console.log(this.modelMesh);
      this.pinkModelMesh.scale.set(4, 4, 4);

      for (let i = 0; i < 8; i++) {
        const flowerCur = this.pinkModelMesh.clone();
        const box = new THREE.Box3().setFromObject(flowerCur);
        const width = box.max.y - box.min.y;
        const height = box.max.y - box.min.y;
        const depth = box.max.z - box.min.z;
        const flowerMesh = new THREE.Mesh(
          new THREE.BoxGeometry(width, height, depth),
          new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            opacity: 0,
            transparent: true,
          })
        );
        const flowerMixer = new AnimationMixer(flowerCur);
        const flowerAction = flowerMixer.clipAction(glb.animations[0]);
        flowerAction.clampWhenFinished = true;
        flowerAction.setLoop(THREE.LoopOnce);

        // push
        this.flowerBoxMeshes.push(flowerMesh);
        this.flowerMeshes.push(flowerCur);
        this.flowerMixers.push(flowerMixer);
        this.flowerActions.push(flowerAction);

        flowerCur.position.x = this.pinkPosArr[i].x;
        flowerCur.position.y = -2;
        flowerCur.position.z = this.pinkPosArr[i].z;
        flowerMesh.position.x = this.pinkPosArr[i].x;
        flowerMesh.position.y = 0.01;
        flowerMesh.position.z = this.pinkPosArr[i].z;
        this.boxFlowers.add(flowerMesh);
        this.flowers.add(flowerCur);
      }

      this.pinkActions = [];

      this.pinkMixer = new AnimationMixer(this.pinkModelMesh);
      console.log(glb.animations);
      this.pinkActions[0] = this.pinkMixer.clipAction(glb.animations[0]);
      this.pinkActions[0].clampWhenFinished = true;
      this.pinkActions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.orangeModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.orangePosArr = [
        { x: 0, z: 0 },
        { x: 4, z: 0 },
        { x: 2, z: 1 },
        { x: 0, z: 2 },
        { x: 4, z: 2 },
        { x: 2, z: 3 },
        { x: 0, z: 4 },
        { x: 3, z: 4 },
      ];

      this.orangeModelMesh = glb.scene;
      this.orangeModelMesh.name = "flower";
      this.orangeModelMesh.scale.set(4, 4, 4);

      for (let i = 0; i < 8; i++) {
        const flowerCur = this.orangeModelMesh.clone();
        const box = new THREE.Box3().setFromObject(flowerCur);
        const width = box.max.y - box.min.y;
        const height = box.max.y - box.min.y;
        const depth = box.max.z - box.min.z;
        const flowerMesh = new THREE.Mesh(
          new THREE.BoxGeometry(width, height, depth),
          new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            opacity: 0,
            transparent: true,
          })
        );
        const flowerMixer = new AnimationMixer(flowerCur);
        const flowerAction = flowerMixer.clipAction(glb.animations[0]);
        flowerAction.clampWhenFinished = true;
        flowerAction.setLoop(THREE.LoopOnce);

        // push
        this.flowerBoxMeshes.push(flowerMesh);
        this.flowerMeshes.push(flowerCur);
        this.flowerMixers.push(flowerMixer);
        this.flowerActions.push(flowerAction);

        flowerCur.position.x = this.orangePosArr[i].x;
        flowerCur.position.y = -2;
        flowerCur.position.z = this.orangePosArr[i].z;
        flowerMesh.position.x = this.orangePosArr[i].x;
        flowerMesh.position.y = 0.01;
        flowerMesh.position.z = this.orangePosArr[i].z;
        this.boxFlowers.add(flowerMesh);
        this.flowers.add(flowerCur);
      }

      this.orangeActions = [];

      this.orangeMixer = new AnimationMixer(this.orangeModelMesh);
      console.log(glb.animations);
      this.orangeActions[0] = this.orangeMixer.clipAction(glb.animations[0]);
      this.orangeActions[0].clampWhenFinished = true;
      this.orangeActions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.blueModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.bluePosArr = [
        { x: 2, z: 0 },
        { x: 0, z: 1 },
        { x: 3, z: 1 },
        { x: 1, z: 2 },
        { x: 0, z: 3 },
        { x: 3, z: 3 },
        { x: 1, z: 4 },
        { x: 4, z: 4 },
      ];

      this.blueModelMesh = glb.scene;
      this.blueModelMesh.name = "flower";
      this.blueModelMesh.scale.set(4, 4, 4);

      for (let i = 0; i < 8; i++) {
        const flowerCur = this.blueModelMesh.clone();
        const box = new THREE.Box3().setFromObject(flowerCur);
        const width = box.max.y - box.min.y;
        const height = box.max.y - box.min.y;
        const depth = box.max.z - box.min.z;
        const flowerMesh = new THREE.Mesh(
          new THREE.BoxGeometry(width, height, depth),
          new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            opacity: 0,
            transparent: true,
          })
        );
        const flowerMixer = new AnimationMixer(flowerCur);
        const flowerAction = flowerMixer.clipAction(glb.animations[0]);
        flowerAction.clampWhenFinished = true;
        flowerAction.setLoop(THREE.LoopOnce);

        // push
        this.flowerBoxMeshes.push(flowerMesh);
        this.flowerMeshes.push(flowerCur);
        this.flowerMixers.push(flowerMixer);
        this.flowerActions.push(flowerAction);

        flowerCur.position.x = this.bluePosArr[i].x;
        flowerCur.position.y = -2;
        flowerCur.position.z = this.bluePosArr[i].z;
        flowerMesh.position.x = this.bluePosArr[i].x;
        flowerMesh.position.y = 0.01;
        flowerMesh.position.z = this.bluePosArr[i].z;
        this.boxFlowers.add(flowerMesh);
        this.flowers.add(flowerCur);
      }

      this.blueActions = [];

      this.blueMixer = new AnimationMixer(this.blueModelMesh);
      console.log(glb.animations);
      this.blueActions[0] = this.blueMixer.clipAction(glb.animations[0]);
      this.blueActions[0].clampWhenFinished = true;
      this.blueActions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.plantModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.plantModelMesh = glb.scene;
      // console.log(this.plantModelMesh);

      this.plantModelMesh.name = "plant";
      this.plantModelMesh.scale.set(1.8, 1.8, 1.8);
      this.plantModelMesh.position.x = 0;
      this.plantModelMesh.position.z = 16;
      this.plantModelMesh.position.y = 0;
      this.plantActions = [];

      this.plantMixer = new AnimationMixer(this.plantModelMesh);
      console.log(glb.animations);
      this.plantActions[0] = this.plantMixer.clipAction(glb.animations[0]);
      this.plantActions[1] = this.plantMixer.clipAction(glb.animations[1]);
      this.plantActions[1].clampWhenFinished = true;
      this.plantActions[1].setLoop(THREE.LoopOnce);
      // this.flowers.add(this.plantModelMesh);
      // info.scene.add(this.plantModelMesh);
      this.plantActions[0].play();
    });

    info.gltfLoader.load(info.jolModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          // child.castShadow = true;
        }
      });

      this.jolModelMesh = glb.scene;
      console.log(this.jolModelMesh);

      this.jolMaterialArr = this.jolModelMesh.children;

      this.jolMaterialArr.forEach((e) => {
        e.children[0].material.transparent = true;
        e.children[0].material.opacity = 0;
      });

      this.jolModelMesh.name = "joljol";
      this.jolModelMesh.scale.set(1.5, 1.5, 1.5);
      // this.jolModelMesh.position.x = -15;
      this.jolModelMesh.position.y = 0.7;
      this.jolActions = [];

      this.jolMixer = new AnimationMixer(this.jolModelMesh);
      this.jolActions[0] = this.jolMixer.clipAction(glb.animations[0]);
      console.log(glb.animations);
      this.jolActions[0].clampWhenFinished = true;
      // this.jolActions[0].setLoop(THREE.LoopOnce);
      this.jolActions[0].reset();
      // info.scene.add(this.jolModelMesh);
      // this.jolActions[0].play();
    });

    this.flowers.position.x = -12;
    this.flowers.position.z = 21;
    this.flowers.position.y = 0.5;
    this.boxFlowers.position.x = -12;
    this.boxFlowers.position.z = 21;
    this.boxFlowers.position.y = 0.5;
    // info.scene.add(this.flowers);
    // info.scene.add(this.boxFlowers);
  }
}
