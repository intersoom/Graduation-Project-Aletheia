import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Rose } from "../class/Rose";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SunsetLight } from "../light/SunsetLight";
// import { Sky } from "three/addons/objects/Sky.js";
import Sky from "../shader/Sky";
import { FoxSit } from "../class/FoxSit";
import { PrinceSit } from "../class/PrinceSit";

function Sunset() {
  const containerRef = useRef(null);

  useEffect(() => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    containerRef.current.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 1, 10);

    scene.add(camera);

    // Light
    const light = new SunsetLight({ scene });

    // Mesh
    const geometry = new THREE.SphereGeometry(18, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#ffb300",
      // opacity: 0.8,
      transparent: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = -22.9;
    sphere.position.z = 0;
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    console.log(sphere);
    scene.add(sphere);

    // objects
    const gltfLoader = new GLTFLoader();

    const rose = new Rose({
      scene,
      gltfLoader,
      modelSrc: "rosePGlass.glb",
    });

    const fox = new FoxSit({
      scene,
      gltfLoader,
      modelSrc: "foxSit.glb",
    });

    const prince = new PrinceSit({
      scene,
      gltfLoader,
      modelSrc: "princeSit.glb",
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;

    // controls.update();

    // 그리기
    const clock = new THREE.Clock();

    // Add Sky
    const effectController = {
      turbidity: 10,
      rayleigh: 2.7,
      mieCoefficient: 0.002,
      mieDirectionalG: 0.8,
      elevation: 0.2,
      azimuth: 180,
      exposure: 0.5,
    };

    let sky = Sky();
    sky.scale.setScalar(100);
    scene.add(sky);
    let sun = new THREE.Vector3();

    renderer.toneMappingExposure = effectController.exposure;

    function draw() {
      const delta = clock.getDelta();
      renderer.setAnimationLoop(draw);
      controls.update();

      if (effectController.elevation > -1) {
        effectController.elevation -= 0.009;
        sunChanged();
      }

      renderer.render(scene, camera);
    }

    function setSize() {
      camera.left = -(window.innerWidth / window.innerHeight);
      camera.right = window.innerWidth / window.innerHeight;
      camera.top = 1;
      camera.bottom = -1;

      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    function sunChanged() {
      const uniforms = sky.material.uniforms;
      // console.log(uniforms);
      uniforms["turbidity"].value = effectController.turbidity;
      uniforms["rayleigh"].value = effectController.rayleigh;
      uniforms["mieCoefficient"].value = effectController.mieCoefficient;
      uniforms["mieDirectionalG"].value = effectController.mieDirectionalG;

      const phi = THREE.MathUtils.degToRad(89 - effectController.elevation);
      const theta = THREE.MathUtils.degToRad(effectController.azimuth);

      sun.setFromSphericalCoords(2, phi, theta);

      uniforms["sunPosition"].value.copy(sun);

      renderer.toneMappingExposure = effectController.exposure;
      // renderer.render(scene, camera);
    }

    // 이벤트
    window.addEventListener("resize", setSize);

    draw();
  }, []);

  return (
    <>
      <div style={{ height: "100vh", overflow: "hidden" }} ref={containerRef} />
    </>
  );
}

export default Sunset;
