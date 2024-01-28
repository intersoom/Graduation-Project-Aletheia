import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { TextBufferGeometry } from "three/examples/jsm/geometries/TextBufferGeometry.js";

export class TutorialFont {
  constructor(info) {
    info.fontLoader.load("font.json", (font) => {
      // Geometry 관리
      this.geometry = new TextGeometry("화살표를 따라 꽃밭으로 이동해보세요", {
        font: font,
        size: 0.3,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometry2 = new TextGeometry("다시 가서 네 장미를 돌아봐", {
        font: font,
        size: 0.2,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometry3 = new TextGeometry(
        "네 장미는 오직 하나뿐인 장미라는 걸 알게 될거야",
        {
          font: font,
          size: 0.2,
          height: 0.01,
          curveSegments: 12,
          bevelEnabled: false,
        }
      );

      this.geometry4 = new TextGeometry(
        "네 장미꽃을 그토록 소중하게 만든건 네가 네 꽃에 바친 시간이야",
        {
          font: font,
          size: 0.2,
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

      this.geometry2.computeBoundingBox();
      let xMid2 =
        -0.5 *
        (this.geometry2.boundingBox.max.x - this.geometry2.boundingBox.min.x);
      this.geometry2.translate(xMid2, 0, 0);

      this.geometry3.computeBoundingBox();
      let xMid3 =
        -0.5 *
        (this.geometry3.boundingBox.max.x - this.geometry3.boundingBox.min.x);
      this.geometry3.translate(xMid3, 0, 0);

      this.geometry4.computeBoundingBox();
      let xMid4 =
        -0.5 *
        (this.geometry4.boundingBox.max.x - this.geometry4.boundingBox.min.x);
      this.geometry4.translate(xMid4, 0, 0);

      // Material 관리
      this.textMeshMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 1,
        transparent: true,
      });

      this.textMeshMaterial2 = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      this.textMeshMaterial3 = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      this.textMeshMaterial4 = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      // Mesh 생성
      this.textMesh = new THREE.Mesh(this.geometry, this.textMeshMaterial);
      this.textMesh2 = new THREE.Mesh(this.geometry2, this.textMeshMaterial2);
      this.textMesh3 = new THREE.Mesh(this.geometry3, this.textMeshMaterial3);
      this.textMesh4 = new THREE.Mesh(this.geometry4, this.textMeshMaterial4);

      this.textMesh.position.x = -30;
      this.textMesh.position.y = 0.1;
      this.textMesh.position.z = -13;

      this.textMesh2.position.x = -31.5;
      this.textMesh2.position.y = 2;
      this.textMesh2.position.z = -27;

      this.textMesh3.position.x = -31.5;
      this.textMesh3.position.y = 2;
      this.textMesh3.position.z = -36;

      this.textMesh4.position.x = -31.5;
      this.textMesh4.position.y = 2;
      this.textMesh4.position.z = -45;

      this.textMesh.rotation.x = -Math.PI / 2;

      info.scene.add(this.textMesh);
      info.scene.add(this.textMesh2);
      info.scene.add(this.textMesh3);
      info.scene.add(this.textMesh4);
    });
  }
}
