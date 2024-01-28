import * as THREE from "three";

export class Footprint {
  constructor(info) {
    this.footprintLeftPosition = new THREE.Vector3(-0.1, 0.015, 0);
    this.footprintRightPosition = new THREE.Vector3(0.1, 0.015, 0);

    this.footprintRight = new THREE.Mesh(
      new THREE.PlaneGeometry(0.1, 0.3),
      new THREE.MeshStandardMaterial({
        // map: floorTexture,
        color: "green",
        transparent: true,
      })
    );
    this.footprintRight.position.set(
      this.footprintRightPosition.x,
      this.footprintRightPosition.y,
      this.footprintRightPosition.z
    );
    this.footprintRight.rotation.x = -Math.PI / 2;

    this.footprintLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(0.1, 0.3),
      new THREE.MeshStandardMaterial({
        // map: floorTexture,
        color: "green",
        transparent: true,
      })
    );
    this.footprintLeft.position.set(
      this.footprintLeftPosition.x,
      this.footprintLeftPosition.y,
      this.footprintLeftPosition.z
    );
    this.footprintLeft.rotation.x = -Math.PI / 2;
  }
}
