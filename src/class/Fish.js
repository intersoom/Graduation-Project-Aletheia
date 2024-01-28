import { AnimationMixer } from "three";
import * as THREE from "three";

export class Fish {
  constructor(info) {
    info.gltfLoader.load(info.blueModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.blueModelMesh = glb.scene;
      this.blueModelMesh.scale.set(2, 2, 2);
      this.blueModelMesh.position.z = -6;
      this.blueModelMesh.position.x = -13.5;
      this.blueModelMesh.position.y = -1;

      this.blueFishActions = [];

      this.blueFishMixer = new AnimationMixer(this.blueModelMesh);
      console.log(glb.animations);
      this.blueFishActions[0] = this.blueFishMixer.clipAction(
        glb.animations[0]
      );
      this.blueFishActions[1] = this.blueFishMixer.clipAction(
        glb.animations[1]
      );
      this.blueFishActions[1].clampWhenFinished = true;
      this.blueFishActions[1].setLoop(THREE.LoopOnce);
      this.blueFishActions[0].play();
      // info.scene.add(this.blueModelMesh);
    });

    info.gltfLoader.load(info.orangeModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.orangeModelMesh = glb.scene;
      this.orangeModelMesh.scale.set(2, 2, 2);
      this.orangeModelMesh.position.z = -6;
      this.orangeModelMesh.position.x = -12;
      this.orangeModelMesh.position.y = -1;
      this.orangeModelMesh.rotation.y = (Math.PI / 6) * 5;
      this.orangeFishActions = [];

      this.orangeFishMixer = new AnimationMixer(this.orangeModelMesh);
      console.log(glb.animations);
      this.orangeFishActions[0] = this.orangeFishMixer.clipAction(
        glb.animations[0]
      );
      this.orangeFishActions[1] = this.orangeFishMixer.clipAction(
        glb.animations[1]
      );
      this.orangeFishActions[1].clampWhenFinished = true;
      this.orangeFishActions[1].setLoop(THREE.LoopOnce);
      this.orangeFishActions[0].play();
      // info.scene.add(this.orangeModelMesh);
    });

    info.gltfLoader.load(info.yellowModelSrc, (glb) => {
      this.crownBool = false;

      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.yellowModelMesh = glb.scene;
      this.yellowModelMesh.scale.set(2, 2, 2);
      this.yellowModelMesh.position.z = -6;
      this.yellowModelMesh.position.x = -15.5;
      this.yellowModelMesh.position.y = -1;
      this.yellowModelMesh.rotation.y = (Math.PI / 3) * 2;
      this.yellowFishActions = [];

      this.yellowFishMixer = new AnimationMixer(this.yellowModelMesh);
      console.log(glb.animations);
      this.yellowFishActions[0] = this.yellowFishMixer.clipAction(
        glb.animations[0]
      );
      this.yellowFishActions[1] = this.yellowFishMixer.clipAction(
        glb.animations[1]
      );
      this.yellowFishActions[1].clampWhenFinished = true;
      this.yellowFishActions[1].setLoop(THREE.LoopOnce);
      this.yellowFishActions[0].play();
      // info.scene.add(this.yellowModelMesh);
    });
  }
}
