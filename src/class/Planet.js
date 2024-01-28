export class Planet {
  constructor(info) {
    // this.name = info.name;

    info.gltfLoader.load(info.modelSrc, (glb) => {
      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.receiveShadow = true;
        }
      });

      // this.modelMesh.position.z = -10;

      this.modelMesh = glb.scene;
      this.modelMesh.scale.set(15, 15, 15);

      // this.modelMesh.position.x = 2;
      this.modelMesh.position.y = -8.7;
      this.modelMesh.position.z = -5;

      // this.modelMesh.rotation.y = -Math.PI;

      info.scene.add(this.modelMesh);
    });
  }
}
