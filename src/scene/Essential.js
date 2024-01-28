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
import { LetterSnake } from "../class/LetterSnake";
import { Light } from "../light/Light";

function Essential() {
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
      58,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(0, 1, 4);

    scene.add(camera);

    // Light
    const light = new Light({ scene });

    // Mesh
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({
        color: "white",
        // opacity: 0,
        transparent: true,
      })
    );
    floorMesh.name = "floor";

    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // objects
    const gltfLoader = new GLTFLoader();

    const letterSnake = new LetterSnake({
      scene,
      gltfLoader,
      modelSrc: "letter.glb",
      snakeModelSrc: "blackSnake2.glb",
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;

    // controls.update();

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();
      renderer.setAnimationLoop(draw);
      controls.update();
      if (letterSnake.mixer) letterSnake.mixer.update(delta);

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

    // 이벤트
    window.addEventListener("resize", setSize);

    draw();
  }, []);

  return (
    <>
      <div
        style={{
          height: "100vh",
          overflow: "hidden",
        }}
        ref={containerRef}
      />
    </>
  );
}

export default Essential;
