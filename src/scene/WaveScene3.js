import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import mySound from "../sound/page3.mp3";
import video from "../video/chapter2.mp4";
import { SunsetLight } from "../light/SunsetLight";

function WaveScene2() {
  const containerRef = useRef(null);

  useEffect(() => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    // Texture
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load("floor_tex.png");
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.x = 30;
    floorTexture.repeat.y = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    containerRef.current.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    // scene.fog = new THREE.Fog("#0f082a", 15.0, 50.0);

    // Camera
    var camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.z = 1000;

    // Light
    const light = new SunsetLight({ scene });

    // Wave configuration
    let wavespeed = 2;
    let wavewidth = 400;
    let waveheight = 200;
    let objects_margin = 10;

    let wavespeed2 = 1;
    let wavewidth2 = 400;
    let waveheight2 = -400;
    let objects_margin2 = 10;

    //Array
    let waveobjects = [];
    let waveobjects2 = [];

    // wave particles
    var spriteMaterial = new THREE.SpriteMaterial({
      transparent: true,
      opacity: 1,
      color: 0xff0000,
    });

    var spriteMaterial2 = new THREE.SpriteMaterial({
      transparent: true,
      opacity: 1,
      color: 0x0000ff,
    });

    for (let x = -200; x < 200; x++) {
      for (let y = 0; y < 3; y++) {
        // Sprite creation
        var mesh = new THREE.Sprite(spriteMaterial);

        mesh.scale.set(2, 2, 2); // scale
        mesh.position.x = x * objects_margin; // POSITION X
        mesh.position.y = 0;
        mesh.position.z = y * objects_margin; //POSITION Y
        // scene.add(mesh);
        waveobjects.push(mesh);
      }
    }

    for (let x = -200; x < 200; x++) {
      for (let y = 0; y < 3; y++) {
        // Sprite creation
        let mesh = new THREE.Sprite(spriteMaterial2);

        mesh.scale.set(2, 2, 2); // scale
        mesh.position.x = x * objects_margin2; // POSITION X
        mesh.position.y = 0;
        mesh.position.z = y * objects_margin2; //POSITION Y
        scene.add(mesh);
        waveobjects2.push(mesh);
      }
    }

    // 그리기
    const clock = new THREE.Clock();
    let count = 0;

    function draw() {
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;
      requestAnimationFrame(draw);

      for (let i = 0; i < waveobjects.length; i++) {
        waveobjects[i].position.y =
          Math.cos(
            (elapsed +
              waveobjects[i].position.x / wavewidth +
              waveobjects[i].position.z / wavewidth) *
              wavespeed
          ) * waveheight;
      }

      for (let i = 0; i < waveobjects2.length; i++) {
        waveobjects2[i].position.y =
          Math.cos(
            (elapsed +
              waveobjects2[i].position.x / wavewidth2 +
              waveobjects2[i].position.z / wavewidth2) *
              wavespeed2
          ) *
            waveheight +
          Math.cos(
            (elapsed +
              waveobjects2[i].position.x / wavewidth2 +
              waveobjects2[i].position.z / wavewidth2) *
              wavespeed2 *
              0.8 *
              2
          );

        count += 0.1;
      }
      renderer.render(scene, camera);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;

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
        style={{ height: "100vh", overflow: "hidden", background: "black" }}
        ref={containerRef}
      ></div>
    </>
  );
}

export default WaveScene2;
