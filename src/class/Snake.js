import { AnimationMixer } from "three";
import * as THREE from "three";

export class Snake {
  constructor(info) {
    this.moving = false;
    this.visible = false;
    this.touchable = false;
    this.snakeGroup = new THREE.Group();

    info.gltfLoader.load(info.snakeModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.snakeModelMesh = glb.scene;
      console.log(this.snakeModelMesh);
      this.snakeModelMesh.children[0].children[0].name = "snake";
      // this.modelMesh.children[1].name = "snake";
      // this.modelMesh.children[2].name = "snake";
      // this.modelMesh.children[3].name = "snake";

      // this.snakeModelMesh.position.z = 18;
      // this.snakeModelMesh.position.x = 9;
      // this.snakeModelMesh.position.y = -3;

      // this.snakeModelMesh.scale.set(1.7, 1.7, 1.7);
      this.snakeModelMesh.scale.set(3, 3, 3);

      this.snakeModelMesh.rotation.y = -Math.PI / 2;

      // info.scene.add(this.snakeModelMesh);
      this.snakeGroup.add(this.snakeModelMesh);
      info.meshes.push(this.snakeModelMesh);

      this.snakeActions = [];

      this.snakeMixer = new AnimationMixer(this.snakeModelMesh);

      this.snakeActions[0] = this.snakeMixer.clipAction(glb.animations[0]);
      this.snakeActions[0].clampWhenFinished = true;
      this.snakeActions[0].setLoop(THREE.LoopOnce);

      // this.snakeActions[1] = this.snakeMixer.clipAction(glb.animations[1]);
      console.log(this.snakeActions);
    });

    info.gltfLoader.load(info.eleModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.eleModelMesh = glb.scene;
      console.log(this.eleModelMesh);
      this.eleModelMesh.children[0].children[0].name = "snake";
      // this.modelMesh.children[1].name = "snake";
      // this.modelMesh.children[2].name = "snake";
      // this.modelMesh.children[3].name = "snake";

      // this.eleModelMesh.scale.set(1.7, 1.7, 1.7);
      this.eleModelMesh.scale.set(3.0, 3.0, 3.0);

      this.eleModelMesh.rotation.y = -Math.PI / 2;

      this.snakeGroup.add(this.eleModelMesh);
      info.meshes.push(this.eleModelMesh);

      this.eleActions = [];

      this.eleMixer = new AnimationMixer(this.eleModelMesh);

      this.eleActions[0] = this.eleMixer.clipAction(glb.animations[0]);
      this.eleActions[0].clampWhenFinished = true;
      this.eleActions[0].setLoop(THREE.LoopOnce);
      this.eleActions[1] = this.eleMixer.clipAction(glb.animations[1]);
    });

    // (9, y, 18)
    this.snakeGroup.position.x = 9 + 34;
    this.snakeGroup.position.y = -3;
    this.snakeGroup.position.z = 21 + 13;
    //재영쓰
    // this.snakeGroup.position.z = 13;
    // this.snakeGroup.position.x = 9;
    // this.snakeGroup.position.y = 0;
    info.scene.add(this.snakeGroup);
  }
}
