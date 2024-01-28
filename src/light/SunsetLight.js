import * as THREE from "three";

export class SunsetLight {
  constructor(info) {
    const ambientLight = new THREE.AmbientLight("white", 0.3);
    info.scene.add(ambientLight);

    // const spotLight = new THREE.SpotLight("orange", 0.35);
    // spotLight.position.set(100, 100, 100);

    this.spotLightRose = new THREE.SpotLight(
      "white",
      0.8,
      30,
      Math.PI * 0.08,
      0.1,
      1
    );
    this.spotLightRose.position.set(0, 8, 3);
    // info.scene.add(this.spotLightRose);

    this.spotLightRose2 = new THREE.SpotLight("white", 0.4, 30, Math.PI * 0.08);
    this.spotLightRose2.position.set(0, 10, -1);
    // info.scene.add(this.spotLightRose2);

    this.spotLightRose.target.position.z = -1.8;
    info.scene.add(this.spotLightRose.target);
    this.spotLightRose2.target.position.z = -3.5;
    // info.scene.add(this.spotLightRose2.target);

    const directionalLight = new THREE.DirectionalLight("white", 0.2);
    // const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
    // this.directionalLight.position.x = directionalLightOriginPosition.x;
    directionalLight.position.x = 400;
    directionalLight.position.y = 700;
    directionalLight.position.z = -300;
    // this.directionalLight.position.z = directionalLightOriginPosition.z;
    directionalLight.castShadow = true;
    // spotLight.castShadow = true;

    // mapSize 세팅으로 그림자 퀄리티 설정
    directionalLight.shadow.mapSize.width = 256;
    directionalLight.shadow.mapSize.height = 256;
    // 그림자 범위
    // directionalLight.shadow.camera.left = -100;
    // directionalLight.shadow.camera.right = 100;
    // directionalLight.shadow.camera.top = 100;
    // directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 1000;

    // spotLight.shadow.mapSize.width = 2048;
    // spotLight.shadow.mapSize.height = 2048;

    // spotLight.shadow.camera.near = -100;
    // spotLight.shadow.camera.far = 100;
    info.scene.add(directionalLight);
    // info.scene.add(spotLight);

    this.pointLight = new THREE.PointLight(0xff0000, 1000);
    this.pointLight.distance = 4;
    // this.pointLight.decay = 0.1;
  }
}
