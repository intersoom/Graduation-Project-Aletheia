import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Player } from "../class/Player";
import gsap from "gsap";
import { LoadingManager } from "three";
import { Light } from "../light/Light";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { Font } from "../utils/Font";
import { Snake } from "../class/Snake";
import { Crown } from "../class/Crown";
import { BackObjects } from "../class/BackObjects";
import { Airplane } from "../class/Airplane";
import gifImg from "../gif/princeInfo2.gif";
import wateringGif from "../gif/watering.gif";
import { Floor } from "../class/Floor";
import { EXRLoader } from "three/addons/loaders/EXRLoader.js";
import { Cloud } from "../class/Cloud";
import { Dunk } from "../class/Dunk";
import { Footprint } from "../class/Footprint";
import { LetterSnake } from "../class/LetterSnake";
import useSound from "use-sound";
import mySound from "../sound/page1.mp3"; // Your sound file path here
// import AudioPlayer from "react-h5-audio-player";
import { Flower } from "../class/Flower";
import { useNavigate } from "react-router-dom";
import { KeyController } from "../utils/KeyController";
import { Bao } from "../class/Bao";
import { Fish } from "../class/Fish";
import { Question } from "../class/Question";
import { Picture } from "../class/Picture";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

function Intro() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const infoRef = useRef(null);
  const flowerInfoRef = useRef(null);
  const loadingRef = useRef(null);

  const [loadingVal, setLoadingVal] = useState(0);
  const [loadBool, setLoadBool] = useState(false);
  const [infoBool, setInfoBool] = useState(false);
  const [infoFlowerBool, setInfoFlowerBool] = useState(false);
  const [infoRemove, setInfoRemove] = useState(false);
  const [infoFlowerRemove, setInfoFlowerRemove] = useState(false);
  const [playSound, { isPlaying }] = useSound(mySound);

  const [coco, setCoco] = useState(false);
  const [flower, setFlower] = useState(false);
  const [fish, setFish] = useState(false);

  const width = document.body.clientWidth;

  useEffect(() => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    let selected = false;
    let flowerMode = false;
    let fishJump = 0;
    let flowerI = null;
    let flowerClick = false;
    // const plugin = gsap().registerPlugin();
    const visited = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    let background = scene.background;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    let exrCubeRenderTarget;
    let exrBackground;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    camera.position.x = 1;
    camera.position.y = 13;
    camera.position.z = 8;
    // scene.fog = new THREE.Fog("#e5b380", 0.0, 35.0);
    scene.fog = new THREE.Fog("#B6895A", 0.0, 35.0);
    // scene.fog = new THREE.FogExp2("#e5b380", 0.03);

    let cameraPosition = new THREE.Vector3(0, 3, 4.8);
    // camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    // camera.zoom = 0.18;
    // camera.updateProjectionMatrix();

    const camera2 = new THREE.PerspectiveCamera(75, width / height, 0.1, 500);

    camera2.position.x = 9;
    camera2.position.y = 1.5;
    camera2.position.z = 27;
    const flowerCam = new THREE.PerspectiveCamera(75, width / height, 0.1, 500);
    flowerCam.position.x = -10;
    flowerCam.position.y = 4.5;
    flowerCam.position.z = 26;

    scene.add(camera, camera2, flowerCam);

    // Light
    const light = new Light({ scene });

    // exr
    new EXRLoader().load("test4.exr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
      exrBackground = texture;
    });

    // Mesh
    const meshes = [];
    const meshes2 = [];
    const meshes3 = [];

    const loader = new FontLoader();

    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({
        // map: floorTexture,
        color: "#6e5338",
        opacity: 0,
        transparent: true,
      })
    );
    floorMesh.name = "floor";

    floorMesh.rotation.x = -Math.PI / 2;
    // floorMesh.position.y = -0.2;
    // floorMesh.receiveShadow = true;
    // scene.add(floorMesh);
    // meshes3.push(floorMesh);

    const pointerMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        color: "crimson",
        transparent: true,
        opacity: 0.0,
      })
    );
    pointerMesh.rotation.x = -Math.PI / 2;
    pointerMesh.position.y = 0.01;
    pointerMesh.receiveShadow = true;
    // scene.add(pointerMesh);

    const spotMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: "yellow",
        transparent: true,
        opacity: 0.3,
      })
    );

    spotMesh.position.set(6, 0.005, 24);
    spotMesh.rotation.x = -Math.PI / 2;
    spotMesh.receiveShadow = true;
    scene.add(spotMesh);

    const flowerZoneTexture = textureLoader.load("flower.png");

    const flowerZoneMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        // color: "yellow",
        map: flowerZoneTexture,
        transparent: true,
        opacity: 0.7,
      })
    );

    flowerZoneMesh.position.set(-6.5, 0.25, 22.5);
    flowerZoneMesh.rotation.x = -Math.PI / 2;
    scene.add(flowerZoneMesh);

    const baoZoneTexture = textureLoader.load("baobab.png");

    const baoZoneMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        // color: "yellow",
        map: baoZoneTexture,
        transparent: true,
        opacity: 0.7,
      })
    );

    baoZoneMesh.position.set(14.5, 0.05, 5);
    baoZoneMesh.rotation.x = -Math.PI / 2;
    scene.add(baoZoneMesh);

    const fishZoneTexture = textureLoader.load("fish.png");

    const fishZoneMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshStandardMaterial({
        // color: "yellow",
        map: fishZoneTexture,
        transparent: true,
        opacity: 0.7,
      })
    );

    fishZoneMesh.position.set(-5.5, 0.001, -4);
    fishZoneMesh.rotation.x = -Math.PI / 2;
    fishZoneMesh.rotation.z = Math.PI / 3;
    scene.add(fishZoneMesh);

    // Points
    const geometry = new THREE.BufferGeometry();
    const count = 200000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 80;
    }
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3) // 1개의 Vertex(정점)를 위해 값 3개 필요
    );
    const material = new THREE.PointsMaterial({
      size: 0.003,
      // color: "#e5b380",
      color: "#ffdfb2",
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Loadingf

    const MANAGER = new LoadingManager();

    MANAGER.onProgress = function (url, loaded, total) {
      setLoadingVal((loaded / total) * 100);
    };
    let loaded = false;
    MANAGER.onLoad = function () {
      setLoadBool(true);
      loaded = true;
    };

    // objects
    const gltfLoader = new GLTFLoader(MANAGER);

    const floor = new Floor({
      scene,
      gltfLoader,
      modelSrc: "badakMURI.glb",
      meshes,
      meshes3,
    });

    const airplane = new Airplane({
      scene,
      gltfLoader,
      modelSrc: "airplane2.glb",
    });

    // 어린왕자
    const player = new Player({
      scene,
      meshes,
      gltfLoader,
      modelSrc: "fastfast.glb",
    });

    const footprint = new Footprint({ scene });

    const font = new Font({ scene, camera, loader });

    const picture = new Picture({ scene, gltfLoader, modelSrc: "yesdae.glb" });

    const snake = new Snake({
      scene,
      meshes: meshes3,
      gltfLoader,
      snakeModelSrc: "lighterSnake.glb",
      eleModelSrc: "eleLonger.glb",
    });

    const crown = new Crown({
      scene,
      gltfLoader,
      modelSrc: "crown.glb",
    });

    const backObj = new BackObjects({
      scene,
      gltfLoader,
      meshes: meshes2,
      oasisModelSrc: "treeWind.glb",
      cactusModelSrc: "cactus2.glb",
      waterModelSrc: "wattter.glb",
      rockModelSrc: "doll.glb",
    });

    const cloud = new Cloud({
      scene,
      gltfLoader,
      modelSrc: "cloud2.glb",
    });

    const flower = new Flower({
      scene,
      gltfLoader,
      pinkModelSrc: "NoScalePink.glb",
      orangeModelSrc: "NoScaleOrange.glb",
      blueModelSrc: "NoScaleBlue.glb",
      plantModelSrc: "ssakFlower.glb",
      jolModelSrc: "bobo.glb",
    });

    const dunk = new Dunk({
      scene,
      gltfLoader,
      modelSrc: "smallD.glb",
      model2Src: "midD.glb",
      model3Src: "bigDunk.glb",
    });

    const letterSnake = new LetterSnake({
      scene,
      gltfLoader,
      modelSrc: "letter2.glb",
      snakeModelBiggerSrc: "biggerDelay.glb",
      snakeModelSrc: "outSnake.glb",
      snakeModel2Src: "gray.glb",
    });

    const bao = new Bao({
      scene,
      gltfLoader,
      modelSrc: "bao.glb",
      meshes: meshes3,
    });

    const fish = new Fish({
      scene,
      gltfLoader,
      blueModelSrc: "blueFish.glb",
      orangeModelSrc: "orangeFish.glb",
      yellowModelSrc: "yellowFish.glb",
    });

    const question = new Question({
      scene,
      gltfLoader,
      modelSrc: "qqq.glb",
      camera: { x: 0, y: 0, z: 4.8 },
    });

    // Controls
    const controls = new PointerLockControls(camera, renderer.domElement);

    controls.domElement.addEventListener("click", () => {
      controls.lock();
    });
    controls.addEventListener("lock", () => {
      console.log("lock!");
    });
    controls.addEventListener("unlock", () => {
      console.log("unlock!");
    });

    // 키보드 컨트롤
    const keyController = new KeyController();

    function walk() {
      if (keyController.keys["KeyW"] || keyController.keys["ArrowUp"]) {
        controls.moveForward(0.02);
      }
      if (keyController.keys["KeyS"] || keyController.keys["ArrowDown"]) {
        controls.moveForward(-0.02);
      }
      if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
        controls.moveRight(-0.02);
      }
      if (keyController.keys["KeyD"] || keyController.keys["ArrowRight"]) {
        controls.moveRight(0.02);
      }
    }

    flowerCam.lookAt(-10, 0, 23);

    // camera2.lookAt = new THREE.Vector3(9, -3, 18);
    camera2.updateProjectionMatrix();

    const raycaster = new THREE.Raycaster();
    const playerRaycater = new THREE.Raycaster();
    const flowerRaycater = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let destinationPoint = new THREE.Vector3();
    let angle = 0;
    let isPressed = false; // 마우스를 누르고 있는 상태

    const targetOrientation = new THREE.Quaternion(
      0,
      0.9812428633760961,
      0,
      0.19277562883694618
    );
    const targetOrientation2 = camera2.quaternion.clone();
    const startCamOrientation2 = camera.quaternion.clone();

    // 그리기
    const clock = new THREE.Clock();
    // const controls = new OrbitControls(camera, renderer.domElement);

    function draw() {
      const delta = clock.getDelta();
      renderer.setAnimationLoop(draw);
      walk();
      // controls.update();
      // newEnvMap = exrCubeRenderTarget ? exrCubeRenderTarget.texture : null;
      background = exrBackground;
      scene.background = exrBackground;

      if (player.modelMesh) {
        particles.position.y = player.modelMesh.position.y;
        particles.position.z = player.modelMesh.position.z;
      }

      if (particles.position.x < 10) {
        particles.position.x += 0.04;
      } else {
        particles.position.x = -10;
      }

      if (cloud.modelMesh && cloud.modelMesh2) {
        if (cloud.modelMesh.position.x < 70) {
          cloud.modelMesh.position.x += 0.025;
        } else {
          cloud.modelMesh.position.x = -70;
        }

        if (cloud.modelMesh2.position.x < 70) {
          cloud.modelMesh2.position.x += 0.025;
        } else {
          cloud.modelMesh2.position.x = -70;
        }
      }

      if (player.mixer) player.mixer.update(delta);
      if (snake.snakeMixer) snake.snakeMixer.update(delta);
      if (snake.eleMixer) snake.eleMixer.update(delta);
      if (airplane.mixer) airplane.mixer.update(delta);
      if (floor.mixer) floor.mixer.update(delta);
      if (backObj.mixer) backObj.mixer.update(delta);
      if (dunk.mixer) dunk.mixer.update(delta);
      if (dunk.mixer2) dunk.mixer2.update(delta);
      if (dunk.mixer3) dunk.mixer3.update(delta);
      if (letterSnake.mixer) letterSnake.mixer.update(delta);
      if (letterSnake.snakeMixer) letterSnake.snakeMixer.update(delta);
      if (letterSnake.snake2Mixer) letterSnake.snake2Mixer.update(delta);
      if (letterSnake.snakeBiggerMixer)
        letterSnake.snakeBiggerMixer.update(delta);
      if (flower.pinkMixer) flower.pinkMixer.update(delta);
      if (flower.blueMixer) flower.blueMixer.update(delta);
      if (flower.orangeMixer) flower.orangeMixer.update(delta);
      if (flower.plantMixer) flower.plantMixer.update(delta);
      if (flower.jolMixer) flower.jolMixer.update(delta);
      if (bao.mixer) bao.mixer.update(delta);
      if (fish.blueFishMixer) fish.blueFishMixer.update(delta);
      if (fish.orangeFishMixer) fish.orangeFishMixer.update(delta);
      if (fish.yellowFishMixer) fish.yellowFishMixer.update(delta);
      if (crown.crownBool) crown.modelMesh.rotation.y += delta;
      if (player.modelMesh && !snake.visible) {
        camera.lookAt(
          player.modelMesh.position.x,
          player.modelMesh.position.y,
          player.modelMesh.position.z - 6.5
        );
        camera.updateProjectionMatrix();
      }
      for (let i = 0; i < flower.flowerMixers.length; i++) {
        if (flower.flowerMixers[i]) {
          flower.flowerMixers[i].update(delta);
        }
      }

      if (bao.actions && bao.actions[1].time > 2.666) {
        bao.actions[2].play();
      }

      if (airplane.modelMesh && !airplane.airPlaneDone && loaded) {
        const planeLook = new THREE.Vector3(
          0,
          airplane.modelMesh.position.y,
          0
        );

        camera.updateProjectionMatrix();
        const airTime = airplane.actions[0].time;
        // if (loadBool) {
        airplane.actions[0].play();
        // }

        camera.lookAt(planeLook);
        if (airplane.modelMesh.position.y >= 0.05) {
          airplane.modelMesh.position.y -= 0.07;
        } else {
          if (airTime >= 4.2 && airTime < 7.9 && player.modelMesh) {
            gsap.to(camera.position, {
              duration: 1,
              x: 0,
              y: 3,
              z: 4.8,
              onUpdate: function () {
                gsap.to(camera, {
                  duration: 2,
                  zoom: 1.2,
                  ease: "slow(0.3, 0.3, false)",
                  onUpdate: function () {
                    airplane.airPlaneDone = true;
                  },
                });
                camera.updateProjectionMatrix();
              },
              onComplete: function () {
                cameraPosition = new THREE.Vector3(0, 3, 4.8);
                camera.updateProjectionMatrix();
              },
            });
          }
        }
      }

      if (player.modelMesh && airplane.modelMesh) {
        if (
          airplane.modelMesh.children[0] &&
          airplane.modelMesh.children[2] &&
          airplane.actions[0].time >= 7.9
        ) {
          airplane.modelMesh.children[0].removeFromParent();
          // airplane.modelMesh.children[2].removeFromParent();
          scene.add(player.modelMesh);
          player.actions[0].play();
          setTimeout(() => {
            setInfoBool(true);
          }, 2000);
        }
        if (isPressed && !flowerMode) {
          raycasting();
          playerRaycasting();
        }
        // fish
        if (fishJump === 1) {
          if (fish.blueFishActions[0].time < 0.5) {
            fish.blueFishActions[0].stop();
            fish.orangeFishActions[0].stop();
            fish.yellowFishActions[0].stop();
            fish.blueFishActions[1].play();
            fish.orangeFishActions[1].play();
            fish.yellowFishActions[1].play();
            setFish(true);
          }
          if (fish.blueFishActions[1].time >= 3.8) {
            fishJump = 0;
          }
          // fishJump++;
        } else {
          if (fish.blueFishActions && fish.blueFishActions[1].time >= 3.8) {
            fish.blueFishActions[1].stop();
            fish.orangeFishActions[1].stop();
            fish.yellowFishActions[1].stop();
            fish.blueFishActions[0].play();
            fish.orangeFishActions[0].play();
            fish.yellowFishActions[0].play();
          }
        }

        // flower
        if (flower.jolActions && flower.jolActions[0].time >= 3.6) {
          flower.jolMaterialArr.forEach((e) => {
            gsap.to(e.children[0].material, {
              duration: 0.5,
              opacity: 0,
              onUpdate: function () {
                gsap.to(flower.flowerMeshes[flowerI].position, {
                  duration: 1,
                  y: -0.1,
                  onUpdate: function () {
                    visited[flowerI] = 1;
                  },
                  onComplete: function () {
                    flower.flowerActions[flowerI].play();
                  },
                });
                flower.jolActions[0].stop();
              },
              onComplete: function () {
                flower.jolActions[0].time = 0;
              },
            });
          });
        }

        if (
          flower.flowerActions[flowerI] &&
          flower.flowerActions[flowerI].time >= 0.66 &&
          flower.jolActions[0].time === 0
        ) {
          flowerClick = false;
        }

        if (player.moving && !player.movingDone && !flowerMode) {
          playerRaycasting();
          // 발자국 (작업중)
          // footprint.footprintLeftPosition = new THREE.Vector3(
          //   player.modelMesh.position.x - 0.1,
          //   0.015,
          //   player.modelMesh.position.z
          // );
          // footprint.footprintRightPosition = new THREE.Vector3(
          //   player.modelMesh.position.x + 0.1,
          //   0.015,
          //   player.modelMesh.position.z
          // );

          // const footRightNew = footprint.footprintRight.clone();

          // footRightNew.position.set(
          //   footprint.footprintRightPosition.x,
          //   footprint.footprintRightPosition.y,
          //   footprint.footprintRightPosition.z
          // );
          // scene.add(footRightNew);
          // gsap.to(footRightNew.material, {
          //   duration: 3,
          //   opacity: 0,
          //   ease: "Power3.easeOut",
          // });

          // const footLeftNew = footprint.footprintLeft.clone();
          // footLeftNew.position.set(
          //   footprint.footprintLeftPosition.x,
          //   footprint.footprintLeftPosition.y,
          //   footprint.footprintLeftPosition.z
          // );
          // scene.add(footLeftNew);
          // gsap.to(footLeftNew.material, {
          //   duration: 3,
          //   opacity: 0,
          //   ease: "Power3.easeOut",
          // });

          // 걸어가는 상태
          angle = Math.atan2(
            destinationPoint.z - player.modelMesh.position.z,
            destinationPoint.x - player.modelMesh.position.x
          );
          player.modelMesh.position.x += Math.cos(angle) * player.speed;
          player.modelMesh.position.z += Math.sin(angle) * player.speed;

          // player.modelMesh.up = floor.modelMesh.up;

          camera.position.x = cameraPosition.x + player.modelMesh.position.x;
          camera.position.z = cameraPosition.z + player.modelMesh.position.z;
          // camera.updateProjectionMatrix();

          player.actions[2].stop();
          player.actions[1].play();

          if (
            Math.abs(destinationPoint.x - player.modelMesh.position.x) <
              player.speed &&
            Math.abs(destinationPoint.z - player.modelMesh.position.z) <
              player.speed
          ) {
            player.moving = false;
          }

          if (
            Math.abs(font.textMesh.position.z - player.modelMesh.position.z) <
            0.05
          ) {
            gsap.to(font.textMeshMaterial, {
              duration: 1,
              opacity: 0.8,
              ease: "Power3.easeOut",
              onUpdate: function () {
                font.textMesh.castShadow = true;
              },
            });
          }

          if (
            Math.abs(
              picture.modelMesh.position.z - player.modelMesh.position.z
            ) > 4
          ) {
            gsap.to(picture.modelMesh.position, {
              duration: 1.5,
              y: 1.4,
              ease: "Power3.easeOut",
            });
          }

          if (
            Math.abs(
              font.textMeshSecond.position.z - player.modelMesh.position.z
            ) < 0.05
          ) {
            gsap.to(font.textMeshSecondMaterial, {
              duration: 1,
              opacity: 0.8,
              ease: "Power3.easeOut",
              onUpdate: function () {
                font.textMeshSecond.castShadow = true;
              },
            });
          }

          if (
            Math.abs(
              font.textMeshThird.position.z - player.modelMesh.position.z
            ) < 0.05
          ) {
            gsap.to(font.textMeshThirdMaterial, {
              duration: 1,
              opacity: 0.8,
              ease: "Power3.easeOut",
              onUpdate: function () {
                font.textMeshThird.castShadow = true;
              },
            });
          }

          if (
            Math.abs(
              font.textMeshFourth.position.z - player.modelMesh.position.z
            ) < 0.05
          ) {
            gsap.to(font.textMeshFourthMaterial, {
              duration: 1,
              opacity: 0.8,
              ease: "Power3.easeOut",
              onUpdate: function () {
                font.textMeshThird.castShadow = true;
              },
            });
          }

          if (
            Math.abs(
              font.textMeshFifth.position.z - player.modelMesh.position.z
            ) < 0.05
          ) {
            gsap.to(font.textMeshFifthMaterial, {
              duration: 1,
              opacity: 0.8,
              ease: "Power3.easeOut",
              onUpdate: function () {
                font.textMeshThird.castShadow = true;
              },
            });
          }
        } else {
          if (flowerMode && isPressed && !flowerClick) {
            flowerRaycasting();
          }
          // 서 있는 상태
          player.actions[1].stop();
          player.actions[2].play();

          // 뱀 위치 도달시
          if (
            Math.abs(spotMesh.position.x - player.modelMesh.position.x) < 0.5 &&
            Math.abs(spotMesh.position.z - player.modelMesh.position.z) < 0.5
          ) {
            if (!snake.visible) {
              // 들어갔을 때 터치 안되게 제어하기

              // new THREE.Vector3(9, -3, 18)

              // test
              const startOrientation = player.modelMesh.quaternion.clone();

              snake.visible = true;
              player.movingDone = true;
              // floor.actions[0].play();
              spotMesh.material.color.set("seagreen");
              const tl = gsap.timeline();

              tl.to(player.modelMesh, {
                duration: 0.55,
                onUpdate: function () {
                  // player.modelMesh.lookAt(new THREE.Vector3(9, 0, 18));
                  player.modelMesh.quaternion
                    .copy(startOrientation)
                    .slerp(targetOrientation, this.progress());
                },
              })
                .to(camera.position, {
                  duration: 2,
                  x: 7,
                  y: 6,
                  z: 29,
                  onUpdate: function () {
                    // camera.quaternion
                    //   .copy(startCamOrientation)
                    //   .slerp(targetOrientation, this.progress());
                    camera.lookAt(
                      player.modelMesh.position.x,
                      player.modelMesh.position.y,
                      player.modelMesh.position.z - 4
                    );
                  },
                })
                .to(snake.snakeGroup.position, {
                  duration: 1,
                  y: 0,
                  ease: "Power3.easeOut",
                });

              setTimeout(() => {
                snake.snakeActions[0].play();
                snake.eleActions[0].play();
              }, 4500);

              setTimeout(() => {
                scene.add(crown.modelMesh);
                gsap.to(crown.modelMaterial, {
                  duration: 2,
                  opacity: 1,
                  onComplete: function () {
                    snake.touchable = true;
                  },
                });
                gsap.to(font.touchMaterial, { duration: 2, opacity: 1 });

                crown.crownBool = true;
              }, 8500);
            }
          }

          // 꽃 위치 도달시
          if (
            Math.abs(flowerZoneMesh.position.x - player.modelMesh.position.x) <
              1.5 &&
            Math.abs(flowerZoneMesh.position.z - player.modelMesh.position.z) <
              1.5
          ) {
            if (!infoFlowerRemove) {
              setTimeout(() => {
                setInfoFlowerBool(true);
              }, 2000);
            }

            if (!infoFlowerBool) {
              if (keyController.keys["KeyD"]) {
                flowerMode = true;
                setFlower(true);
              }
            }

            if (keyController.keys["Escape"]) {
              flowerMode = false;

              camera.lookAt(
                player.modelMesh.position.x,
                player.modelMesh.position.y,
                player.modelMesh.position.z - 6.5
              );
              camera.updateProjectionMatrix();
            }
          }
        }
      }

      if (selected) {
        const tl2 = gsap.timeline();
        tl2.to(camera.position, {
          duration: 1,
          x: camera2.position.x,
          y: camera2.position.y,
          ease: "SlowMo.ease.config(0.7, 0.1, false)",
          onUpdate: function () {
            camera.quaternion
              .copy(startCamOrientation2)
              .slerp(targetOrientation2, this.progress());
          },
        });
        gsap.to(camera.position, {
          duration: 4,
          z: camera2.position.z,
          ease: "SlowMo.ease.config(0.7, 0.7, false)",
        });
        font.touchMesh.removeFromParent();
        crown.modelMesh.clear();
        player.modelMesh.clear();
        scene.add(letterSnake.modelMesh);
        letterSnake.actions[0].play();

        if (letterSnake.actions[0].time >= 6.9) {
          scene.add(letterSnake.snakeModelMesh);
          gsap.to(letterSnake.snakeModelMesh.position, {
            duration: 1,
            y: 0,
            ease: "Power3.easeOut",
            onComplete: function () {
              letterSnake.modelMesh.clear();
              letterSnake.snakeActions[0].play();
            },
          });
          // scene.add(letterSnake.snakeModelBiggerMesh);
          // letterSnake.snakeBiggerActions[0].play();
          // if (letterSnake.snakeBiggerActions[0].time >= 2) {
          // letterSnake.snakeModelBiggerMesh.clear();
          if (letterSnake.snakeActions[0].time >= 3) {
            letterSnake.snakeModelMesh.clear();
            scene.add(letterSnake.snakeModel2Mesh);
            letterSnake.snake2Actions[0].play();
            if (letterSnake.snake2Actions[0].time >= 7.2) {
              if (scene.children) {
                scene.clear();
              }
              scene.background = new THREE.Color("black");

              setTimeout(() => {
                navigate("/waveVideo", { replace: false });
                navigate(0);
              }, 2000);
            }
          }
          // }
        }

        renderer.render(scene, camera);
      } else if (flowerMode) {
        flowerZoneMesh.traverse(function (child) {
          if (child) {
            child.visible = false;
          }
        });
        player.modelMesh.traverse(function (child) {
          if (child) {
            child.visible = false;
          }
        });
        font.textMeshFourth.traverse(function (child) {
          if (child) {
            child.visible = false;
          }
        });
        flower.plantActions[1].play();
        renderer.render(scene, flowerCam);
      } else {
        if (flowerZoneMesh) {
          flowerZoneMesh.traverse(function (child) {
            if (child) {
              child.visible = true;
            }
          });
        }
        if (player.modelMesh) {
          player.modelMesh.traverse(function (child) {
            if (child) {
              child.visible = true;
            }
          });
        }
        if (font.textMeshFourth) {
          font.textMeshFourth.traverse(function (child) {
            if (child) {
              child.visible = true;
            }
          });
        }

        renderer.render(scene, camera);
      }
    }

    function checkIntersects() {
      const intersects = raycaster.intersectObjects(meshes3);

      for (const item of intersects) {
        if (
          item.object.name === "snake" &&
          snake.touchable &&
          Math.abs(spotMesh.position.x - player.modelMesh.position.x) < 1.5 &&
          Math.abs(spotMesh.position.z - player.modelMesh.position.z) < 1.5
        ) {
          selected = true;
          // crown.crownBool = false;

          // gsap.to(player.modelMesh.position, {
          //   duration: 2,
          //   x: 7,
          //   z: 18.8,
          // });

          const temp = new THREE.Vector3(9.3, 0, 27);

          player.modelMesh.lookAt(temp);
        } else if (
          item.object.name === "floor" &&
          // 범위 지정
          item.point.x < 19 &&
          item.point.x > -19 &&
          item.point.z < 27 &&
          item.point.z > -12
        ) {
          player.moving = true;
          destinationPoint.x = item.point.x;
          destinationPoint.y = player.modelMesh.position.y;
          destinationPoint.z = item.point.z;

          if (!player.movingDone) {
            player.modelMesh.lookAt(destinationPoint);

            // pointerMesh.position.x = destinationPoint.x;
            // pointerMesh.position.z = destinationPoint.z;
          }
        } else if (
          item.object.name === "bao" &&
          baoZoneMesh.position.x - player.modelMesh.position.x < 0.5 &&
          baoZoneMesh.position.z - player.modelMesh.position.z < 0.5
        ) {
          bao.actions[0].stop();
          bao.actions[1].play();
          setCoco(true);
          console.log(bao.actions[1]);
        }
        break;
      }
    }

    function checkIntersects2() {
      const intersects = playerRaycater.intersectObjects(meshes2);
      const intersects2 = playerRaycater.intersectObjects(meshes);
      // console.log(intersects2);
      if (intersects2.length > 0) {
        if (intersects.length > 0 && intersects[0].object.name === "water") {
          console.log(fish.blueFishActions[0].time);
          if (fishJump === 0) {
            fishJump = 1;
            question.modelMesh.clear();
          }
          console.log(fish.blueFishActions[1].time);
          if (intersects2[0].point.y > -0.5) {
            player.modelMesh.position.y = intersects2[0].point.y;
          } else {
            player.modelMesh.position.y = -0.5;
          }
        } else {
          fishJump = 0;
          // player.modelMesh.position.y = 0;
          player.modelMesh.position.y = intersects2[0].point.y;
        }
      }
    }

    function checkIntersectsFlower() {
      const intersects = flowerRaycater.intersectObjects(
        flower.flowerBoxMeshes
      );
      for (const item of intersects) {
        console.log(item);
        item.object.position.y = 0;
      }

      for (let i = 0; i < flower.flowerBoxMeshes.length; i++) {
        if (flower.flowerBoxMeshes[i].position.y === 0 && visited[i] === 0) {
          flowerI = i;
          flowerClick = true;
          flower.jolMaterialArr.forEach((e) => {
            e.children[0].material.opacity = 1;
          });

          const worldPosition = new THREE.Vector3();
          flower.flowers.getWorldPosition(worldPosition);
          const localPosition = flower.flowerBoxMeshes[i].position.clone();
          const realWorldPosition = worldPosition.add(localPosition);

          flower.jolModelMesh.position.x = realWorldPosition.x + 0.5;
          flower.jolModelMesh.position.y = 1.8;
          flower.jolModelMesh.position.z = realWorldPosition.z + 0.2;

          flower.jolActions[0].play();
        }
      }
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    // 이벤트
    window.addEventListener("resize", setSize);

    // 마우스 좌표를 three.js에 맞게 변환
    function calculateMousePosition(e) {
      mouse.x = (e.clientX / containerRef.current.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY / containerRef.current.clientHeight) * 2 - 1);
    }

    // 변환된 마우스 좌표를 이용해 래이캐스팅
    function raycasting() {
      raycaster.setFromCamera(mouse, camera);
      checkIntersects();
    }

    function playerRaycasting() {
      playerRaycater.set(
        new THREE.Vector3(
          player.modelMesh.position.x,
          4,
          player.modelMesh.position.z
        ),
        new THREE.Vector3(0, -1, 0)
      );
      checkIntersects2();
    }

    function flowerRaycasting() {
      flowerRaycater.setFromCamera(mouse, flowerCam);

      checkIntersectsFlower();
    }

    // 마우스 이벤트
    containerRef.current.addEventListener("mousedown", (e) => {
      isPressed = true;
      calculateMousePosition(e);
    });
    containerRef.current.addEventListener("mouseup", () => {
      isPressed = false;
    });
    containerRef.current.addEventListener("mousemove", (e) => {
      if (isPressed) {
        calculateMousePosition(e);
      }
    });

    // 터치 이벤트
    containerRef.current.addEventListener("touchstart", (e) => {
      isPressed = true;
      calculateMousePosition(e.touches[0]);
    });
    containerRef.current.addEventListener("touchend", () => {
      isPressed = false;
    });
    containerRef.current.addEventListener("touchmove", (e) => {
      if (isPressed) {
        calculateMousePosition(e.touches[0]);
      }
    });

    draw();
  }, []);

  useEffect(() => {
    if (infoRemove) {
      infoRef.current.remove();
    }
  }, [infoRemove]);

  useEffect(() => {
    if (infoFlowerRemove) {
      flowerInfoRef.current.remove();
    }
  }, [infoFlowerRemove]);

  useEffect(() => {
    if (loadBool) {
      loadingRef.current.remove();
    }
  }, [loadBool]);

  return (
    <>
      {/* Loading Page */}
      <div
        className="font-hand"
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#FFFFFF",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        ref={loadingRef}
      >
        <label className="text-xl mb-5">착륙 준비중..</label>
        <progress
          style={{
            borderRadius: 10,
          }}
          value={loadingVal}
          max={100}
        ></progress>
      </div>

      <div
        className="font-hand"
        style={
          infoFlowerBool
            ? {
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#00000080",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }
            : {
                height: "100vh",
                width: "100vw",
                position: "absolute",
                opacity: 0,
                top: 0,
                left: 0,
                display: "none",
              }
        }
        ref={flowerInfoRef}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "19px", textAlign: "center", lineHeight: 5 }}>
            <h3 className="text-xl font-semibold">
              원하는 곳을 터치해서 꽃에 물을 줘보세요!{" "}
              <p className="font-medium text-lg">D 버튼: 꽃밭 모드</p>
              <p className="font-medium text-lg">ESC 버튼: 일반 모드</p>
            </h3>
            <p>목표: 꽃 다 피우기!</p>
          </div>
          <div className="w-40">
            <img src={wateringGif} alt="gif" loop="infinite" />
          </div>
          <button
            style={{
              width: 200,
              height: 40,
              borderRadius: 40,
              backgroundColor: "#FFFFFFC4",
              color: "black",
              cursor: "pointer",
              marginTop: 30,
            }}
            onClick={() => {
              setInfoFlowerBool(false);
              setInfoFlowerRemove(true);
            }}
          >
            시작하기
          </button>
        </div>
      </div>
      <div
        style={{ height: "100vh", overflow: "hidden", backgroundColor: "blue" }}
        ref={containerRef}
      >
        {/* nav */}
        <div
          className="h-20 w-52"
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0)",
            top: 10,
            // right: 30,
            right: width / 2 - 100,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={coco ? "coco_icon.png" : "coco_line.png"}
            alt="coco"
            style={{
              height: "60%",
            }}
          />
          <img
            src={fish ? "fish_icon.png" : "fish_line.png"}
            alt="fish"
            style={{
              height: "45%",
            }}
          />
          <img
            src={flower ? "flower_icon.png" : "flower_line.png"}
            alt="flower"
            style={{
              height: "60%",
            }}
          />
        </div>
      </div>

      <div
        className="font-hand"
        style={
          infoBool
            ? {
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#00000080",
                color: "white",
                display: "flex",
                justifyContent: "center",
              }
            : {
                height: "100vh",
                width: "100vw",
                position: "absolute",
                opacity: 0,
                top: 0,
                left: 0,
              }
        }
        ref={infoRef}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "19px", textAlign: "center", lineHeight: 5 }}>
            <h3 className="text-3xl font-semibold">
              원하는 곳을 터치해서 어린왕자를 움직여보세요 !
            </h3>
            <p>목표: 보아뱀을 찾아라!</p>
          </div>
          <div className="w-64">
            <img src={gifImg} alt="gif" loop="infinite" />
          </div>
          <button
            style={{
              width: 200,
              height: 40,
              borderRadius: 40,
              backgroundColor: "#FFFFFFC4",
              color: "black",
              cursor: "pointer",
              marginTop: 30,
            }}
            onClick={() => {
              setInfoBool(false);
              setInfoRemove(true);
            }}
          >
            시작하기
          </button>
        </div>
      </div>
      <iframe
        title="autoPlay"
        src={mySound}
        allow="autoplay"
        id="audio"
        style={{ display: "none" }}
      ></iframe>
      <audio id="player" autoplay loop>
        <source src={mySound} type="audio/mp3" />
      </audio>
    </>
  );
}

export default Intro;
