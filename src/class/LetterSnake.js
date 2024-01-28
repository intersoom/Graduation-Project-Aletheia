import { AnimationMixer } from "three";
import * as THREE from "three";

export class LetterSnake {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene;
      this.modelMesh.rotation.y = -Math.PI / 2;
      console.log(this.modelMesh);
      this.modelMesh.children[0].children.forEach((i) => {
        i.material.transparent = true;
      });
      // info.scene.add(this.modelMesh);
      this.modelMesh.scale.set(3, 3, 3);

      this.modelMesh.position.z = 21 + 13;
      this.modelMesh.position.x = 9 + 34;
      // this.modelMesh.position.y = 1.5;

      this.actions = [];

      this.mixer = new AnimationMixer(this.modelMesh);

      this.actions[0] = this.mixer.clipAction(glb.animations[0]);
      this.actions[0].clampWhenFinished = true;
      this.actions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.snakeModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.snakeModelMesh = glb.scene;
      this.snakeModelMesh.rotation.y = -Math.PI / 2;
      // this.snakeModelMesh.scale.set(0.7, 0.7, 0.7);
      // console.log(this.snakeModelMesh);

      // info.scene.add(this.snakeModelMesh);
      this.snakeModelMesh.position.z = 22 + 13;
      this.snakeModelMesh.position.x = 9 + 34;
      this.snakeModelMesh.position.y = -2;

      this.snakeActions = [];

      this.snakeMixer = new AnimationMixer(this.snakeModelMesh);
      this.snakeActions[0] = this.snakeMixer.clipAction(glb.animations[0]);
      this.snakeActions[0].clampWhenFinished = true;
      this.snakeActions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.snakeModel2Src, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.snakeModel2Mesh = glb.scene;
      this.snakeModel2Mesh.rotation.y = Math.PI / 2;
      // this.snakeModelMesh.scale.set(0.7, 0.7, 0.7);
      // console.log(this.snakeModelMesh);

      // info.scene.add(this.snakeModelMesh);
      this.snakeModel2Mesh.position.z = 23 + 13;
      this.snakeModel2Mesh.position.x = 19 + 34;

      this.snake2Actions = [];

      this.snake2Mixer = new AnimationMixer(this.snakeModel2Mesh);
      this.snake2Actions[0] = this.snake2Mixer.clipAction(glb.animations[0]);
      this.snake2Actions[0].clampWhenFinished = true;
      this.snake2Actions[0].setLoop(THREE.LoopOnce);
    });

    info.gltfLoader.load(info.snakeModelBiggerSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.snakeModelBiggerMesh = glb.scene;
      this.snakeModelBiggerMesh.rotation.y = -Math.PI / 2;

      this.snakeModelBiggerMesh.position.z = 22 + 13;
      this.snakeModelBiggerMesh.position.x = 9 + 34;

      this.snakeBiggerActions = [];

      this.snakeBiggerMixer = new AnimationMixer(this.snakeModelBiggerMesh);
      this.snakeBiggerActions[0] = this.snakeBiggerMixer.clipAction(
        glb.animations[0]
      );
      this.snakeBiggerActions[0].clampWhenFinished = true;
      this.snakeBiggerActions[0].setLoop(THREE.LoopOnce);
    });
  }
}
