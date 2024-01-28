import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { TextBufferGeometry } from "three/examples/jsm/geometries/TextBufferGeometry.js";

export class EndingFont {
  constructor(info) {
    info.loader.load("font.json", (font) => {
      // Geometry 관리
      this.geometry = new TextGeometry("내가 그의 이름을 불러주기 전에는", {
        font: font,
        size: 0.1,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometrySecond = new TextGeometry(
        "그는 다만 하나의 몸짓에 지나지 않았다.",
        {
          font: font,
          size: 0.1,
          height: 0.01,
          curveSegments: 12,
          bevelEnabled: false,
        }
      );

      this.geometryThird = new TextGeometry("내가 그의 이름을 불러주었을 때,", {
        font: font,
        size: 0.1,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometryFourth = new TextGeometry(
        "그는 나에게로 와서 꽃이 되었다.",
        {
          font: font,
          size: 0.1,
          height: 0.01,
          curveSegments: 12,
          bevelEnabled: false,
        }
      );

      // ComputeBoundingBox 관리
      this.geometry.computeBoundingBox();
      let xMid =
        -0.5 *
        (this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x);
      this.geometry.translate(xMid, 0, 0);

      this.geometrySecond.computeBoundingBox();
      let x2Mid =
        -0.5 *
        (this.geometrySecond.boundingBox.max.x -
          this.geometrySecond.boundingBox.min.x);
      this.geometrySecond.translate(x2Mid, 0, 0);

      this.geometryThird.computeBoundingBox();
      let x3Mid =
        -0.5 *
        (this.geometryThird.boundingBox.max.x -
          this.geometryThird.boundingBox.min.x);
      this.geometryThird.translate(x3Mid, 0, 0);

      this.geometryFourth.computeBoundingBox();
      let x4Mid =
        -0.5 *
        (this.geometryFourth.boundingBox.max.x -
          this.geometryFourth.boundingBox.min.x);
      this.geometryFourth.translate(x4Mid, 0, 0);

      // Material 관리
      this.textMeshMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        opacity: 0,
        transparent: true,
      });

      this.textMeshSecondMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        opacity: 0,
        transparent: true,
      });

      this.textMeshThirdMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        opacity: 0,
        transparent: true,
      });

      this.textMeshFourthMaterial = new THREE.MeshStandardMaterial({
        color: "white",
        opacity: 0,
        transparent: true,
      });

      // Mesh 생성
      this.textMesh = new THREE.Mesh(this.geometry, this.textMeshMaterial);

      this.textMeshSecond = new THREE.Mesh(
        this.geometrySecond,
        this.textMeshSecondMaterial
      );

      this.textMeshThird = new THREE.Mesh(
        this.geometryThird,
        this.textMeshThirdMaterial
      );

      this.textMeshFourth = new THREE.Mesh(
        this.geometryFourth,
        this.textMeshFourthMaterial
      );

      this.textMesh.position.z = 14;
      this.textMesh.position.y = -2;

      this.textMeshSecond.position.z = 12;
      this.textMeshSecond.position.y = -2;

      this.textMeshThird.position.z = 10;
      this.textMeshThird.position.y = -2;

      this.textMeshFourth.position.z = 8;
      this.textMeshFourth.position.y = -2;

      info.scene.add(this.textMesh);
      info.scene.add(this.textMeshSecond);
      info.scene.add(this.textMeshThird);
      info.scene.add(this.textMeshFourth);
    });
  }
}
