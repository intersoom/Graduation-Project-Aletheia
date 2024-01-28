import * as THREE from "three";

export class FlowerSpace {
  constructor(info) {
    info.gltfLoader.load(info.pinkModelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });

      this.pinkModelMesh = glb.scene;
      this.pinkModelMesh.name = "flower";

      this.pinkModelMesh.scale.set(0.8, 0.8, 0.8);

      for (let j = 0; j < 20; j++) {
        for (let k = 0; k < 4; k++) {
          const flowerCur = this.pinkModelMesh.clone();

          flowerCur.position.x = -27 - k + Math.random() * 0.4;
          flowerCur.position.y = -0.4;
          flowerCur.position.z = -25 - j;

          info.scene.add(flowerCur);
        }
      }

      for (let j = 0; j < 20; j++) {
        for (let k = 0; k < 4; k++) {
          const flowerCur = this.pinkModelMesh.clone();

          flowerCur.position.x = -34 - k + Math.random() * 0.4;
          flowerCur.position.y = -0.4;
          flowerCur.position.z = -25 - j;

          info.scene.add(flowerCur);
        }
      }
    });
  }
}
