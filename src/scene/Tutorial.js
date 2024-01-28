import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import mySound from "../sound/tutorial2.mp3";
// import video from "../video/chapter2.mp4";
import { useNavigate } from "react-router-dom";
import { TutorialLight } from "../light/TutorialLight";
import { KeyController } from "../utils/KeyController";
import { Player } from "../class/Player";
import { FoxHand } from "../class/FoxHand";
import { Arrow } from "../class/Arrow";
import { TutorialFont } from "../utils/TutorialFont";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { FlowerSpace } from "../class/FlowerSpace";
import { PrincePlane } from "../class/PrincePlane";
import loadingGif from "../gif/loading.GIF";

function Tutorial() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const startRef = useRef(null);
  const loadRef = useRef(null);
  const endingRef = useRef(null);
  const startCountRef = useRef(0);

  const [startBool, setStartBool] = useState(0);
  const [endingBool, setEndingBool] = useState(false);
  const [loadBool, setLoadBool] = useState(false);

  useEffect(() => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // let, const
    let angle = 0;
    const rotateQuarternion = new THREE.Quaternion();
    const princeQuarternion = new THREE.Quaternion();
    const foxRotateQuarternion = new THREE.Quaternion();
    const rotateAngle = new THREE.Vector3(0, 1, 0);
    const walkDirection = new THREE.Vector3();
    let foxStart = false;
    let cameraMove = false;
    let foxMoveMode = false;
    let foxMoveMode2 = false;
    let startMode = true;
    let keyBoardAvail = false;
    let next = 0;
    let roseMode = false;
    let airplaneMode = false;
    let airplaneReady = true;

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
    scene.background = new THREE.Color("white");

    // Camera
    var camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(-1, 5, 8);
    camera.zoom = 2;
    camera.updateProjectionMatrix();
    camera.lookAt(-1, 0, -2);

    var camera2 = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera2.position.set(-31.5, 2, -17);
    camera2.zoom = 2;
    camera2.updateProjectionMatrix();
    camera2.lookAt(-31.5, 2, -20);

    const MANAGER = new THREE.LoadingManager();
    // renderPass
    MANAGER.onLoad = function () {
      setLoadBool(true);
    };

    // Light
    const light = new TutorialLight({ scene });

    // objects
    const gltfLoader = new GLTFLoader(MANAGER);

    const textureLoader = new THREE.TextureLoader();

    const floorTexture = textureLoader.load(
      "grid.png",
      function (loadedTexture) {
        // 텍스처가 로드된 후 처리할 로직
        console.log("텍스처 로드 완료");
      },
      function (error) {
        // 오류 발생 시 처리할 로직
        console.log("텍스처 로드 중 오류 발생:", error);
      }
    );
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.x = 15;
    floorTexture.repeat.y = 15;

    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 150),
      new THREE.MeshStandardMaterial({
        map: floorTexture,
      })
    );
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    const followTexture = textureLoader.load(
      "followme.png",
      function (loadedTexture) {
        // 텍스처가 로드된 후 처리할 로직
        console.log("텍스처 로드 완료");
      },
      function (error) {
        // 오류 발생 시 처리할 로직
        console.log("텍스처 로드 중 오류 발생:", error);
      }
    );
    const followMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        map: followTexture,
        transparent: true,
        opacity: 0.0,
      })
    );
    followMesh.position.y = 1.7;
    followMesh.position.x = -1.1;
    scene.add(followMesh);

    const fontLoader = new FontLoader();

    const tutorialFont = new TutorialFont({ scene, fontLoader });

    // 어린왕자
    const player = new Player({
      scene,
      gltfLoader,
      modelSrc: "fastfast.glb",
      tutorial: true,
    });

    const foxHand = new FoxHand({
      scene,
      gltfLoader,
      modelSrc: "asFox.glb",
    });

    const arrow = new Arrow({
      scene,
      gltfLoader,
      modelSrc: "Arrow.glb",
    });

    const flowerSpace = new FlowerSpace({
      scene,
      gltfLoader,
      pinkModelSrc: "pinkRose.glb",
      blueModelSrc: "blueRose.glb",
      yellowModelSrc: "yellowRose.glb",
      greenModelSrc: "greenRose.glb",
    });

    const princePlane = new PrincePlane({
      scene,
      gltfLoader,
      modelSrc: "princePlane.glb",
      modelSrc2: "onlyplane.glb",
    });

    // functions

    const keyController = new KeyController();

    function updateCameraTarget(moveX, moveZ) {
      // // move camera
      camera.position.x -= moveX;
      camera.position.z -= moveZ;
    }

    function walk() {
      let directionOffset = 0;
      if (keyController.keys["KeyW"] || keyController.keys["ArrowUp"]) {
        if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
          directionOffset = -Math.PI / 4 - Math.PI / 2; // s + d
        } else if (
          keyController.keys["KeyD"] ||
          keyController.keys["ArrowRight"]
        ) {
          directionOffset = Math.PI / 4 + Math.PI / 2; // s + a
        } else {
          directionOffset = Math.PI;
        }
      } else if (
        keyController.keys["KeyS"] ||
        keyController.keys["ArrowDown"]
      ) {
        if (keyController.keys["KeyA"] || keyController.keys["ArrowLeft"]) {
          directionOffset = -Math.PI / 4; // w + d
        } else if (
          keyController.keys["KeyD"] ||
          keyController.keys["ArrowRight"]
        ) {
          directionOffset = Math.PI / 4; // w + a
        }
      } else if (
        keyController.keys["KeyA"] ||
        keyController.keys["ArrowLeft"]
      ) {
        directionOffset = -Math.PI / 2; // d
      } else if (
        keyController.keys["KeyD"] ||
        keyController.keys["ArrowRight"]
      ) {
        directionOffset = Math.PI / 2; // a
      }

      return directionOffset;
    }

    function walkCheck() {
      if (keyController.keys["KeyW"] || keyController.keys["ArrowUp"]) {
        player.moving = true;
      } else if (
        keyController.keys["KeyS"] ||
        keyController.keys["ArrowDown"]
      ) {
        player.moving = true;
      } else if (
        keyController.keys["KeyA"] ||
        keyController.keys["ArrowLeft"]
      ) {
        player.moving = true;
      } else if (
        keyController.keys["KeyD"] ||
        keyController.keys["ArrowRight"]
      ) {
        player.moving = true;
      } else {
        player.moving = false;
      }
    }

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();
      if (arrow.modelMesh) {
        arrow.modelMesh.position.x = -33;
        arrow.modelMesh.position.y = -0.2;
        arrow.modelMesh.position.z = -17;
        arrow.modelMesh.rotation.y = Math.PI / 2;
      }
      // animation mixer
      if (foxHand.mixer) foxHand.mixer.update(delta);
      if (princePlane.mixer) princePlane.mixer.update(delta);

      // walk
      walkCheck();

      if (player.modelMesh && keyBoardAvail) {
        if (player.moving) {
          angle = Math.atan2(
            camera.position.x - player.modelMesh.position.x,
            camera.position.z - player.modelMesh.position.z
          );

          let directionOffset = walk();

          rotateQuarternion.setFromAxisAngle(
            rotateAngle,
            angle + directionOffset
          );
          player.modelMesh.quaternion.rotateTowards(rotateQuarternion, 0.2);

          // calculate direction
          camera.getWorldDirection(walkDirection);
          walkDirection.y = 0;
          walkDirection.normalize();
          walkDirection.applyAxisAngle(rotateAngle, directionOffset);

          // move model & camera
          const moveX = walkDirection.x * player.speed * delta;
          const moveZ = walkDirection.z * player.speed * delta;
          player.modelMesh.position.x -= moveX;
          player.modelMesh.position.z -= moveZ;
          camera.position.x -= moveX;
          camera.position.z -= moveZ;

          if (roseMode) {
            angle = Math.atan2(
              camera2.position.x - player.modelMesh.position.x,
              camera2.position.z - player.modelMesh.position.z
            );

            let directionOffset = walk();

            rotateQuarternion.setFromAxisAngle(
              rotateAngle,
              angle + directionOffset
            );
            player.modelMesh.quaternion.rotateTowards(rotateQuarternion, 0.2);

            // calculate direction
            camera2.getWorldDirection(walkDirection);
            walkDirection.y = 0;
            walkDirection.normalize();
            walkDirection.applyAxisAngle(rotateAngle, directionOffset);

            // move model & camera
            const moveX = walkDirection.x * delta;
            const moveZ = walkDirection.z * delta;
            player.modelMesh.position.x -= moveX;
            player.modelMesh.position.z -= moveZ;
            if (player.modelMesh.position.z < -27) {
              camera2.position.z = player.modelMesh.position.z + 10;
            }

            if (
              Math.abs(
                tutorialFont.textMesh2.position.z - player.modelMesh.position.z
              ) < 1
            ) {
              gsap.to(tutorialFont.textMeshMaterial2, {
                duration: 1,
                opacity: 0.8,
                ease: "Power3.easeOut",
              });
            }

            if (
              Math.abs(
                tutorialFont.textMesh3.position.z - player.modelMesh.position.z
              ) < 1
            ) {
              gsap.to(tutorialFont.textMeshMaterial3, {
                duration: 1,
                opacity: 0.8,
                ease: "Power3.easeOut",
              });
            }

            if (
              Math.abs(
                tutorialFont.textMesh4.position.z - player.modelMesh.position.z
              ) < 1
            ) {
              gsap.to(tutorialFont.textMeshMaterial4, {
                duration: 1,
                opacity: 0.8,
                ease: "Power3.easeOut",
              });
            }
          }

          // updateCameraTarget(moveX, moveZ);
          if (player.mixer) player.mixer.update(delta);
          player.actions[2].stop();
          player.actions[1].play();
        } else if (airplaneMode) {
          player.actions[2].stop();
          player.actions[1].stop();
        } else {
          if (player.mixer) player.mixer.update(delta);
          player.actions[1].stop();
          player.actions[2].play();
        }
      }

      // start mode
      if (
        foxHand.modelMesh &&
        foxHand.actions &&
        player.modelMesh &&
        startMode
      ) {
        if (player.mixer) player.mixer.update(delta);
        // setTimeout(() => {

        princeQuarternion.setFromAxisAngle(rotateAngle, -Math.PI / 2);

        // }, 4000);

        if (!foxStart) {
          gsap.to(foxHand.modelMesh.position, {
            duration: 5,
            x: -2,
            onUpdate: () => {
              if (foxHand.modelMesh.position.x <= -2.8) {
                foxHand.actions[0].crossFadeTo(foxHand.actions[3], 2, true);
                foxStart = true;
              } else if (foxHand.modelMesh.position.x === -2) {
                foxHand.actions[0].stop();
                foxHand.actions[3].play();
              }
            },
          });
        }

        if (foxHand.actions[3].time >= 0.01 && foxHand.actions[3].time < 1.4) {
          gsap.to(followMesh.material, {
            duration: 0.4,
            opacity: 0.8,
          });
          player.modelMesh.quaternion.rotateTowards(princeQuarternion, 0.06);
        }

        if (foxHand.actions[3].time >= 1.4) {
          foxHand.actions[3].stop();

          foxHand.actions[4].play();
          setTimeout(() => {
            setStartBool(1);
            startCountRef.current = 1;
          }, 1000);
        }
        if (startCountRef.current === 2) {
          gsap.to(followMesh.material, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => {
              startMode = false;
              foxMoveMode = true;
            },
          });
        }
      }

      // fox move
      if (
        foxHand.modelMesh &&
        foxHand.actions &&
        player.modelMesh &&
        foxMoveMode
      ) {
        if (!cameraMove) {
          gsap.to(camera.position, {
            duration: 0.5,
            x: 0,
            y: 7,
            z: 10,
            onUpdate: () => {
              camera.lookAt(
                player.modelMesh.position.x,
                player.modelMesh.position.y,
                player.modelMesh.position.z
              );
              camera.updateProjectionMatrix();
            },
            onComplete: () => {
              if (camera.position.x === player.modelMesh.position.x) {
                keyBoardAvail = true;
                cameraMove = true;
              }
            },
          });
        }
        // foxRotateQuarternion.setFromAxisAngle(rotateAngle, -Math.PI / 2);
        // foxHand.modelMesh.quaternion.rotateTowards(foxRotateQuarternion, 0.06);
        foxMoveMode2 = true;
      }
      if (
        foxHand.modelMesh &&
        foxHand.actions &&
        player.modelMesh &&
        foxMoveMode2
      ) {
        let foxAngle = Math.atan2(
          -14 - foxHand.modelMesh.position.x,
          -15 - foxHand.modelMesh.position.z
        );

        let foxAngle2 = Math.atan2(
          -35 - foxHand.modelMesh.position.x,
          -15 - foxHand.modelMesh.position.z
        );

        if (next === 0) {
          gsap.to(foxHand.modelMesh.position, {
            duration: 12,
            x: -14,
            z: -15,
            ease: "Power0.easeNone",
            // ease: CustomEase.create(
            //   "custom",
            //   "M0,0,C0,0,0.078,0,0.214,0.12,0.485,0.359,0.513,0.56,0.758,0.832,0.812,0.892,1,1,1,1"
            // ),
            onStart: () => {
              foxRotateQuarternion.setFromAxisAngle(rotateAngle, foxAngle);
              foxHand.modelMesh.quaternion.rotateTowards(
                foxRotateQuarternion,
                0.03
              );

              if (foxHand.modelMesh.position.x <= -13) {
                next += 1;
              }
            },
            onUpdate: () => {
              foxHand.actions[0].play();
            },
          });
        }
        if (next === 1) {
          gsap.to(foxHand.modelMesh.position, {
            duration: 10,
            x: -30,
            ease: "Power0.easeNone",
            onStart: () => {
              foxRotateQuarternion.setFromAxisAngle(rotateAngle, foxAngle2);
              foxHand.modelMesh.quaternion.rotateTowards(
                foxRotateQuarternion,
                0.03
              );
            },
            onUpdate: () => {
              if (
                foxHand.modelMesh.position.x <= -20 &&
                foxHand.modelMesh.position.x > -28
              ) {
                foxHand.actions[0].fadeOut(5);
              } else if (foxHand.modelMesh.position <= -28) {
                foxHand.actions[0].stop();
                foxHand.actions[4].play();
                next += 1;
              }
            },
          });
        }

        if (
          Math.abs(player.modelMesh.position.x - -31.5) <= 6 &&
          Math.abs(player.modelMesh.position.z - -34.5) <= 10
        ) {
          player.speed = 3;
          roseMode = true;
        }
      }

      if (
        player.modelMesh &&
        -58 <= player.modelMesh.position.z &&
        player.modelMesh.position.z <= -54
      ) {
        gsap.to(princePlane.modelMesh2.position, {
          y: 0,
          duration: 1.2,
          ease: "Elastic.easeOut",
        });
        console.log(player.modelMesh.position.z);
      }

      if (player.modelMesh && player.modelMesh.position.z < -58) {
        airplaneMode = true;
        if (player.mixer) player.mixer.update(delta);
        gsap.to(player.modelMesh.position, {
          x: -31.5,
          z: -65.2,
          duration: 4,
          onUpdate: () => {
            if (player.modelMesh.position.z === -65.2) {
              airplaneReady = false;
              player.actions[1].stop();
              setTimeout(() => {
                scene.add(princePlane.modelMesh);
                player.modelMesh.clear();
                princePlane.modelMesh2.clear();
                princePlane.actions[0].play();
              }, 1000);
            } else if (player.modelMesh.position.z <= -64) {
              player.actions[1].fadeOut(2);
            } else if (airplaneReady) {
              keyBoardAvail = false;
              player.actions[1].play();
            }
          },
        });
      }

      if (princePlane.actions && princePlane.actions[0].time >= 5) {
        setEndingBool(true);
      }

      if (roseMode) {
        renderer.render(scene, camera2);
      } else {
        renderer.render(scene, camera);
      }

      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera2.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
      camera2.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
      renderer.render(scene, camera2);
    }

    // 이벤트
    window.addEventListener("resize", setSize);
    draw();
  }, []);

  useEffect(() => {
    if (startBool === 2) startRef.current.remove();
  }, [startBool]);

  useEffect(() => {
    if (loadBool) loadRef.current.remove();
  }, [loadBool]);

  useEffect(() => {
    if (endingBool) {
      gsap.to(endingRef.current.style, {
        duration: 1,
        opacity: 1,
      });
    }
  });

  return (
    <>
      <div
        ref={loadRef}
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#FFFFFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-80">
          <img src={loadingGif} alt="gif" loop="infinite" />
        </div>
      </div>
      <div
        ref={endingRef}
        style={
          endingBool
            ? {
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
                opacity: 0,
                lineHeight: 1.6,
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
        className="text-black font-hand text-center text-2xl"
      >
        여우는 비행기 앞에서서 어린왕자에게 말했다.
        <br />
        "너의 행성으로 다시 돌아가서 장미와의 기억을 되새겨보렴"
        <br />그 기억 속에서 너가 찾고자 하는 해답을 찾게 될거야
        <button
          className="text-lg"
          style={{
            width: 200,
            height: 40,
            borderRadius: 40,
            backgroundColor: "black",
            opacity: 0.8,
            color: "white",
            cursor: "pointer",
            marginTop: 30,
          }}
          onClick={() => {
            navigate("/main");
            navigate(0);
          }}
        >
          시작하기
        </button>
      </div>
      <div
        ref={startRef}
        className="font-hand flex justify-center items-center flex-col"
        style={
          startBool === 0
            ? {
                height: "100vh",
                width: "100vw",
                position: "absolute",
                opacity: 0,
                top: 0,
                left: 0,
                display: "none",
              }
            : {
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "#00000080",
                color: "white",
              }
        }
      >
        <div className="flex flex-row w-[450px] justify-between mb-10">
          <img className="w-44" src="keyboard1.png" alt="gif" loop="infinite" />
          <img className="w-44" src="keyboard2.png" alt="gif" loop="infinite" />
        </div>
        <h3 className="text-2xl">키보드를 이용해 여우를 따라 이동해보세요</h3>
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
            setStartBool(2);
            startCountRef.current = 2;
          }}
        >
          시작하기
        </button>
      </div>
      <div
        style={{ height: "100vh", overflow: "hidden", background: "white" }}
        ref={containerRef}
      ></div>
      <audio id="player" autoplay loop>
        <source src={mySound} type="audio/mp3" />
      </audio>
    </>
  );
}

export default Tutorial;
