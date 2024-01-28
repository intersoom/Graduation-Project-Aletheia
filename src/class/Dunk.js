import * as THREE from "three";

export class Dunk {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });
      this.modelMesh = glb.scene;
      // 바닥 scale이랑 맞추기
      this.modelMesh.scale.set(8, 8, 8);
      this.modelMesh.position.z = -37;
      console.log(glb.animations);

      this.actions = [];
      this.mixer = new THREE.AnimationMixer(this.modelMesh);
      this.actions[0] = this.mixer.clipAction(glb.animations[0]);

      info.scene.add(this.modelMesh);
      this.actions[0].play();
      // info.scene.add(this.modelMesh2);
    });

    info.gltfLoader.load(info.model2Src, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });
      this.model2Mesh = glb.scene;
      // 바닥 scale이랑 맞추기
      this.model2Mesh.scale.set(8, 8, 8);
      this.model2Mesh.position.z = -40;

      this.actions2 = [];
      this.mixer2 = new THREE.AnimationMixer(this.model2Mesh);
      this.actions2[0] = this.mixer2.clipAction(glb.animations[0]);

      info.scene.add(this.model2Mesh);
      this.actions2[0].play();
      // info.scene.add(this.modelMesh2);
    });

    info.gltfLoader.load(info.model3Src, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.frustumCulled = false;
        }
      });
      this.model3Mesh = glb.scene;
      // 바닥 scale이랑 맞추기
      this.model3Mesh.scale.set(8, 8, 8);
      this.model3Mesh.position.z = -38;

      this.actions3 = [];
      this.mixer3 = new THREE.AnimationMixer(this.model3Mesh);
      this.actions3[0] = this.mixer3.clipAction(glb.animations[0]);

      info.scene.add(this.model3Mesh);
      this.actions3[0].play();
      // info.scene.add(this.modelMesh2);
    });
  }
}
