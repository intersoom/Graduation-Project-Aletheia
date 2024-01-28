export class Crown {
  constructor(info) {
    info.gltfLoader.load(info.modelSrc, (glb) => {
      this.crownBool = false;

      glb.scene.traverse((child) => {
        if (!child.isMesh) return;
        if (child.isMesh) {
          child.castShadow = true;
        }
      });

      this.modelMesh = glb.scene;

      glb.scene.children[0].children[0].material.opacity = 0;
      glb.scene.children[0].children[0].material.transparent = true;
      this.modelMaterial = glb.scene.children[0].children[0].material;
      console.log(this.modelMesh);
      console.log(this.modelMaterial.opacity);
      this.modelMesh.name = "crown";
      this.modelMesh.scale.set(3, 3, 3);

      this.modelMesh.position.x = 9 + 34;
      this.modelMesh.position.y = 3;
      this.modelMesh.position.z = 21 + 13;
      // info.scene.add(this.modelMesh);
    });
  }
}
