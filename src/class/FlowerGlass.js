import { AnimationMixer } from "three";
import * as THREE from "three";

export class FlowerGlass {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene;

      this.modelMesh.position.x = 40;
      this.modelMesh.position.y = -0.1;
      this.modelMesh.position.z = 16;
      info.scene.add(this.modelMesh);
    });

    info.gltfLoader.load(info.nobreakModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.nobreakModelMesh = glb.scene;

      this.nobreakModelMesh.position.x = 40;
      this.nobreakModelMesh.position.y = -0.1;
      this.nobreakModelMesh.position.z = 16;
      // info.scene.add(this.nobreakModelMesh);
      // console.log(this.nobreakModelMesh);
      this.nobreakModelMesh.children[0].children[0].material.side =
        THREE.DoubleSide;
      // animation
      this.fullGlassActions = [];

      this.nobreakGlassMixer = new AnimationMixer(this.nobreakModelMesh);
      this.fullGlassActions[0] = this.nobreakGlassMixer.clipAction(
        glb.animations[0]
      );
      this.fullGlassActions[0].clampWhenFinished = true;
      this.fullGlassActions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.glass1modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.glassModelMesh1 = glb.scene;
      this.glassModelMesh1.children[0].children[0].children[0].material.side =
        THREE.DoubleSide;
      this.glassModelMesh1.children[0].children[0].children[0].material.transparent = true;

      this.glassModelMesh1.position.x = 40;
      this.glassModelMesh1.position.y = -0.1;
      this.glassModelMesh1.position.z = 16;
      info.scene.add(this.glassModelMesh1);

      // box
      this.glassBoxMesh1 = new THREE.Box3().setFromObject(this.glassModelMesh1);

      // animation
      this.actions = [];

      this.glassMixer = new AnimationMixer(this.glassModelMesh1);
      this.actions[0] = this.glassMixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
      this.actions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.glass2modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.glassModelMesh2 = glb.scene;

      this.glassModelMesh2.position.x = 40;
      this.glassModelMesh2.position.y = -0.1;
      this.glassModelMesh2.position.z = 16;
      info.scene.add(this.glassModelMesh2);

      this.glassModelMesh2.children[0].children[0].children[0].material.side =
        THREE.DoubleSide;
      this.glassModelMesh2.children[0].children[0].children[0].material.transparent = true;

      // box
      this.glassBoxMesh2 = new THREE.Box3().setFromObject(this.glassModelMesh2);

      // animation
      this.actions2 = [];

      this.glassMixer2 = new AnimationMixer(this.glassModelMesh2);
      this.actions2[0] = this.glassMixer2.clipAction(glb.animations[0]);
      this.actions2[0].clampWhenFinished = true;
      this.actions2[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.glass3modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.glassModelMesh3 = glb.scene;
      this.glassModelMesh3.children[0].children[0].children[0].material.side =
        THREE.DoubleSide;
      this.glassModelMesh3.children[0].children[0].children[0].material.transparent = true;
      this.glassModelMesh3.children[0].children[0].children[0].material.opacity = 0.7;

      this.glassModelMesh3.position.x = 40;
      this.glassModelMesh3.position.y = -0.1;
      this.glassModelMesh3.position.z = 16;
      info.scene.add(this.glassModelMesh3);

      // box
      this.glassBoxMesh3 = new THREE.Box3().setFromObject(this.glassModelMesh3);

      // animation
      this.actions3 = [];

      this.glassMixer3 = new AnimationMixer(this.glassModelMesh3);
      this.actions3[0] = this.glassMixer3.clipAction(glb.animations[0]);
      this.actions3[0].clampWhenFinished = true;
      this.actions3[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.glass4modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.glassModelMesh4 = glb.scene;

      this.glassModelMesh4.position.x = 40;
      this.glassModelMesh4.position.y = -0.1;
      this.glassModelMesh4.position.z = 16;
      info.scene.add(this.glassModelMesh4);

      this.glassModelMesh4.children[0].children[0].children[0].material.side =
        THREE.DoubleSide;
      this.glassModelMesh4.children[0].children[0].children[0].material.transparent = true;

      // box
      this.glassBoxMesh4 = new THREE.Box3().setFromObject(this.glassModelMesh4);

      // animation
      this.actions4 = [];

      this.glassMixer4 = new AnimationMixer(this.glassModelMesh4);
      this.actions4[0] = this.glassMixer4.clipAction(glb.animations[0]);
      this.actions4[0].clampWhenFinished = true;
      this.actions4[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.glass5modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.glassModelMesh5 = glb.scene;

      this.glassModelMesh5.position.x = 40;
      this.glassModelMesh5.position.y = -0.1;
      this.glassModelMesh5.position.z = 16;
      info.scene.add(this.glassModelMesh5);

      this.glassModelMesh5.children[0].children[0].children[0].material.side =
        THREE.DoubleSide;
      // this.glassModelMesh5.children[0].children[0].children[0].material.transparent = true;

      // box
      this.glassBoxMesh5 = new THREE.Box3().setFromObject(this.glassModelMesh5);

      // animation
      this.actions5 = [];

      this.glassMixer5 = new AnimationMixer(this.glassModelMesh5);
      this.actions5[0] = this.glassMixer5.clipAction(glb.animations[0]);
      this.actions5[0].clampWhenFinished = true;
      this.actions5[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.glass6modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.glassModelMesh6 = glb.scene;

      this.glassModelMesh6.position.x = 40;
      this.glassModelMesh6.position.y = -0.1;
      this.glassModelMesh6.position.z = 16;
      info.scene.add(this.glassModelMesh6);

      this.glassModelMesh6.children[0].children[0].children[0].material.side =
        THREE.DoubleSide;
      this.glassModelMesh6.children[0].children[0].children[0].material.transparent = true;
      // box
      this.glassBoxMesh6 = new THREE.Box3().setFromObject(this.glassModelMesh6);

      // animation
      this.actions6 = [];

      this.glassMixer6 = new AnimationMixer(this.glassModelMesh6);
      this.actions6[0] = this.glassMixer6.clipAction(glb.animations[0]);
      this.actions6[0].clampWhenFinished = true;
      this.actions6[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.glass7modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.glassModelMesh7 = glb.scene;

      this.glassModelMesh7.position.x = 40;
      this.glassModelMesh7.position.y = -0.1;
      this.glassModelMesh7.position.z = 16;
      info.scene.add(this.glassModelMesh7);

      this.glassModelMesh7.children[0].children[0].children[0].material.side =
        THREE.DoubleSide;
      this.glassModelMesh7.children[0].children[0].children[0].material.transparent = true;

      // box
      this.glassBoxMesh7 = new THREE.Box3().setFromObject(this.glassModelMesh7);

      // animation
      this.actions7 = [];

      this.glassMixer7 = new AnimationMixer(this.glassModelMesh7);
      this.actions7[0] = this.glassMixer7.clipAction(glb.animations[0]);
      this.actions7[0].clampWhenFinished = true;
      this.actions7[0].setLoop(THREE.LoopOnce);
    });
  }
}
