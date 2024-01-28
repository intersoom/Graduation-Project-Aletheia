import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { TextBufferGeometry } from "three/examples/jsm/geometries/TextBufferGeometry.js";

export class Font {
  constructor(info) {
    info.loader.load("font.json", (font) => {
      // Geometry 관리
      this.geometry = new TextGeometry("그림이 무섭지 않나요?", {
        font: font,
        size: 0.24,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometrySecond = new TextGeometry("모자 그림이 뭐가 무섭다는거야?", {
        font: font,
        size: 0.24,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometryThird = new TextGeometry(
        "이런 그림 따위는 집어치우고 공부나 하렴",
        {
          font: font,
          size: 0.24,
          height: 0.01,
          curveSegments: 12,
          bevelEnabled: false,
        }
      );

      this.geometryFourth = new TextGeometry("이건 모자 그림이 아닌데", {
        font: font,
        size: 0.24,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometryFifth = new TextGeometry("어른들은 참 이상해..", {
        font: font,
        size: 0.24,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

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

      this.geometryFifth.computeBoundingBox();
      let x5Mid =
        -0.5 *
        (this.geometryFifth.boundingBox.max.x -
          this.geometryFifth.boundingBox.min.x);
      this.geometryFifth.translate(x5Mid, 0, 0);

      // Material 관리
      this.textMeshMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      this.textMeshSecondMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      this.textMeshThirdMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      this.textMeshFourthMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      this.textMeshFifthMaterial = new THREE.MeshStandardMaterial({
        color: "black",
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

      this.textMeshFifth = new THREE.Mesh(
        this.geometryFifth,
        this.textMeshFifthMaterial
      );

      this.textMesh.position.z = -27;
      this.textMesh.position.x = 5;
      this.textMesh.position.y = 0.4;

      this.textMeshSecond.position.z = -23;
      this.textMeshSecond.position.x = -5;
      this.textMeshSecond.position.y = 0.4;

      this.textMeshThird.position.z = -19;
      this.textMeshThird.position.x = 5;
      this.textMeshThird.position.y = 0.4;

      this.textMeshFourth.position.z = -15;
      this.textMeshFourth.position.x = -4;
      this.textMeshFourth.position.y = 0.4;

      this.textMeshFifth.position.z = -11;
      this.textMeshFifth.position.x = 4;
      this.textMeshFifth.position.y = 0.4;

      // --------- touch 따로 관리하기 -----------

      this.touchGeometry = new TextGeometry("Touch!", {
        font: font,
        size: 0.15,
        height: 0.02,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.touchGeometry.computeBoundingBox();
      let touchMid =
        -0.5 *
        (this.touchGeometry.boundingBox.max.x -
          this.touchGeometry.boundingBox.min.x);
      this.touchGeometry.translate(touchMid, 0, 0);

      this.touchMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });
      this.touchMesh = new THREE.Mesh(this.touchGeometry, this.touchMaterial);

      this.touchMesh.position.x = 9 + 34;
      this.touchMesh.position.y = 2;
      this.touchMesh.position.z = 21 + 13 + 2;

      // -------------------------------

      info.scene.add(this.textMesh);
      info.scene.add(this.textMeshSecond);
      info.scene.add(this.textMeshThird);
      info.scene.add(this.textMeshFourth);
      info.scene.add(this.textMeshFifth);
      info.scene.add(this.touchMesh);
    });
  }
}
