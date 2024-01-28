import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import { TextBufferGeometry } from "three/examples/jsm/geometries/TextBufferGeometry.js";

export class EssentialFont {
  constructor(info) {
    info.loader.load("font.json", (font) => {
      const sentence = "what is essential is invisible to the eye";
      const sentenceArr = [...sentence];
      let count = 0;

      sentenceArr.forEach((i) => {
        this.newWord = new THREE.Mesh(
          new TextGeometry(i, {
            font: font,
            size: 0.2,
            height: 0.01,
            curveSegments: 12,
            bevelEnabled: false,
          }),
          new THREE.MeshStandardMaterial({
            color: "black",
            opacity: 1,
            transparent: true,
          })
        );
        this.newWord.position.x = -7 + count * 0.3;
        this.newWord.position.y = 2;
        count++;
        info.scene.add(this.newWord);
      });

      this.geometry = new TextGeometry("그림이 무섭지 않나요?", {
        font: font,
        size: 0.24,
        height: 0.01,
        curveSegments: 12,
        bevelEnabled: false,
      });

      this.geometry.computeBoundingBox();
      let xMid =
        -0.5 *
        (this.geometry.boundingBox.max.x - this.geometry.boundingBox.min.x);
      this.geometry.translate(xMid, 0, 0);

      this.textMeshMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        opacity: 0,
        transparent: true,
      });

      this.textMesh = new THREE.Mesh(this.geometry, this.textMeshMaterial);
    });
  }
}
