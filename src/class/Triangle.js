import * as THREE from "three";
import { AnimationMixer, MeshToonMaterial } from "three";

export class Triangle {
  constructor(info) {
    this.name = info.name;

    this.triA = info.a;
    this.triB = info.b;
    this.triC = info.c;

    this.geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
      8.0, 2.0, 18.0, 10.0, 2.0, 18.0, 10.0, 1.0, 18.0,
    ]);
    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(vertices, 3)
    );

    this.color = new THREE.Color(0xff0000);

    this.material = new THREE.MeshBasicMaterial({ color: this.color });

    this.modelMesh = new THREE.Mesh(this.geometry, this.material);

    info.scene.add(this.modelMesh);
  }
}
