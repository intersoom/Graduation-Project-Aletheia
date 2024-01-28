import { AnimationMixer, MeshToonMaterial } from "three";
import * as THREE from "three";

export class Floor {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = false;
        }
      });

      this.modelMesh = glb.scene;
      console.log(this.modelMesh);
      this.modelMesh.renderOrder = 1;
      this.modelMesh.scale.set(8, 8, 8);
      info.scene.add(this.modelMesh);

      this.box = new THREE.Box3();

      this.box.setFromObject(this.modelMesh);
      console.log(glb.animations);

      this.center = new THREE.Vector3();
      this.box.getCenter(this.center);

      // 객체의 위치 정보를 Box3의 중심점으로 조정
      // this.modelMesh.position.sub(this.center);
      this.modelMesh.position.y = 0;
      this.modelMesh.children[0].children[0].name = "floor";
      info.meshes.push(this.modelMesh.children[0].children[0]);
      info.meshes3.push(this.modelMesh.children[0].children[0]);

      // this.modelMesh2 = this.modelMesh.clone();
      // this.modelMesh2.position.y = 0;
      // this.modelMesh2.children[0].children[0].name = "waterFloor";
      // info.meshes2.push(this.modelMesh2.children[0].children[0]);
      // info.scene.add(this.modelMesh2);
    });
  }
}
