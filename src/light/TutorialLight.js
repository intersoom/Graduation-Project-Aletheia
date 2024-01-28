import * as THREE from "three";

export class TutorialLight {
  constructor(info) {
    const ambientLight = new THREE.AmbientLight("#FFFFFF", 0.7);
    info.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("white", 0.5);
    const directionalLightOriginPosition = new THREE.Vector3(20, 30, 30);
    directionalLight.position.x = directionalLightOriginPosition.x;
    directionalLight.position.y = directionalLightOriginPosition.y;
    directionalLight.position.z = directionalLightOriginPosition.z;
    directionalLight.castShadow = true;

    // mapSize 세팅으로 그림자 퀄리티 설정
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    // 그림자 범위
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 500;
    info.scene.add(directionalLight);
  }
}
