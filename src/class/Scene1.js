import { useRecoilState, useRecoilValue } from "recoil";
import * as THREE from "three";
import { currentRef } from "../recoil/sceneState";

export class Scene1 {
  constructor(setting) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(this.renderer.domElement);
    setting.ref.current.appendChild(this.renderer.domElement);
  }

  render() {
    // Light
    const ambientLight = new THREE.AmbientLight("white", 0.7);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("white", 0.5);
    const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
    directionalLight.position.x = directionalLightOriginPosition.x;
    directionalLight.position.y = directionalLightOriginPosition.y;
    directionalLight.position.z = directionalLightOriginPosition.z;
    directionalLight.castShadow = true;

    //     // mapSize 세팅으로 그림자 퀄리티 설정
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    //     // 그림자 범위
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.near = -100;
    directionalLight.shadow.camera.far = 100;
    this.scene.add(directionalLight);

    // Mesh
    const testplanet = new THREE.Mesh(
      new THREE.SphereGeometry(1, 50, 50),
      new THREE.MeshStandardMaterial({
        color: "green",
      })
    );
    testplanet.name = "testplanet";
    testplanet.position.y = 2;
    testplanet.position.x = -5;
    testplanet.receiveShadow = true;
    console.log(testplanet);
    this.scene.add(testplanet);
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.dispose();
    this.scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => {
            material.dispose();
          });
        } else {
          object.material.dispose();
        }
      }
    });
  }
}
