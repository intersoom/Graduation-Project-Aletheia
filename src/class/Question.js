export class Question {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      this.crownBool = false;

      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }

        this.modelMesh = glb.scene;
        this.modelMesh.position.z = -6;
        this.modelMesh.position.x = -13;
        this.modelMesh.position.y = 2;

        this.modelMesh.scale.set(7, 7, 7);
        this.modelMesh.lookAt(info.camera.x, info.camera.y, info.camera.z);
        // info.scene.add(this.modelMesh);
      });
    });
  }
}
