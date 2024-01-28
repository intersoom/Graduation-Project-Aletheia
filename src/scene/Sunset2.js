import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Rose } from "../class/Rose";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { SunsetLight } from "../light/SunsetLight";
// import { Sky } from "three/addons/objects/Sky.js";
import Sky from "../shader/Sky2";
import StarrySkyShader from "../shader/StarrySkyShader";
import SkyShader from "../shader/SkyShader";
import { FoxSit } from "../class/FoxSit";
import { PrinceSit } from "../class/PrinceSit";
import { shaderMaterial } from "@react-three/drei";
import { Planet } from "../class/Planet";
import { gsap } from "gsap";
import setGradient from "../utils/SetGradient";
import { Bal } from "../class/Bal";
import { Cloud } from "../class/Cloud";
import { Cloud2 } from "../class/Cloud2";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { EndingFont } from "../utils/EndingFont";
import { KeyController } from "../utils/KeyController";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import mySound from "../sound/page3.mp3";
// import video from "../video/ending.mp4";
import { useNavigate } from "react-router-dom";
import { ShootingStar } from "../class/ShootingStar";

function Sunset2() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const opacityRef = useRef(null);
  const loadingRef = useRef(null);
  const videoRef = useRef(null);
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  const roseIntro = document.querySelector("#roseOpa");
  let startBool = false;
  gsap.set(roseIntro, { opacity: 0 });
  // const [loaded, setLoaded] = useState(false);
  let loaded = false;
  const [loadBool, setLoadBool] = useState(false);
  const [videoBool, setVideoBool] = useState(false);
  let stars = [];
  let star;

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;

    containerRef.current.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    // scene.fog = new THREE.Fog("#0f082a", 15.0, 50.0);

    // Camera
    var cameraMain = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    cameraMain.position.set(0, -3.2, 16.5);

    const MANAGER = new THREE.LoadingManager();

    MANAGER.onProgress = function (url, loaded, total) {
      // setLoadingVal((loaded / total) * 100);
      console.log((loaded / total) * 100);
    };
    // renderPass
    MANAGER.onLoad = function () {
      setLoadBool(true);
      loaded = true;
    };

    const renderScene = new RenderPass(scene, cameraMain);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );

    let composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Light
    const light = new SunsetLight({ scene });

    // Mesh
    const geometry = new THREE.SphereGeometry(18, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#ffb300",
      // opacity: 0.8,
      transparent: true,
    });

    const particlesGeometry = new THREE.BufferGeometry();

    const count = 3000;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // const r = (Math.random() - 0.5) * 100;
      // const phi = (Math.random() - 0.5) * Math.PI;
      // const theta = Math.random() * Math.PI * 2;
      // positions[i + 0] = r * Math.cos(theta) * Math.cos(phi);
      // positions[i + 1] = r * Math.sin(phi);
      // positions[i + 2] = r * Math.sin(theta) * Math.cos(phi);
      positions[i + 0] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
      colors[i] = 1;
    }

    const particleTexture = textureLoader.load("star_04.png");

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      // sizeAttenuation: true,
      // vertexColors: true,
      // transparent: true,
      // alphaMap: particleTexture,
      // depthWrite: false,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    // scene.add(particles);

    // objects
    const gltfLoader = new GLTFLoader();

    const rose = new Rose({
      scene,
      gltfLoader,
      modelSrc: "rose.glb",
    });

    const fox = new FoxSit({
      scene,
      gltfLoader,
      modelSrc: "fox2.glb",
    });

    const bal = new Bal({
      scene,
      gltfLoader,
      modelSrc: "bal.glb",
    });

    const prince = new PrinceSit({
      scene,
      gltfLoader,
      modelSrc: "prince2.glb",
    });

    const planet = new Planet({
      scene,
      gltfLoader,
      modelSrc: "planet.glb",
    });

    const cloud = new Cloud2({
      scene,
      gltfLoader,
      modelSrc: "cloud2.glb",
    });

    const shootingStar = new ShootingStar({
      scene,
      gltfLoader,
      modelSrc: "btb.glb",
    });

    const keyController = new KeyController();

    const loader = new FontLoader();
    const font = new EndingFont({ scene, camera: cameraMain, loader });

    // setGradient(geometry, cols, "z", rev);
    // console.log(geometry);
    let walkBool = false;

    // const controls = new OrbitControls(cameraMain, renderer.domElement);

    var skyDomeRadius = 950;
    var sphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        skyRadius: { value: skyDomeRadius },
        // 보라
        env_c1: { value: new THREE.Color("#0f082a") },
        env_c2: { value: new THREE.Color("#4a2a6a") },
        env_c3: { value: new THREE.Color("#7B2D58") },
        env_c4: { value: new THREE.Color("#FF7E00") },
        // 오렌지
        speed: { value: 1.0 },
        time: { value: 0.0 },
        noiseOffset: { value: new THREE.Vector3(100.01, 100.01, 100.01) },
        starSize: { value: 0.005 },
        starDensity: { value: 0.09 },
        clusterStrength: { value: 0.2 },
        clusterSize: { value: 0.2 },
        offset: { type: "f", value: 10 },
        exponent: { type: "f", value: 0.25 },
      },
      vertexShader: SkyShader.vertexShader,
      fragmentShader: SkyShader.fragmentShader,
      side: THREE.DoubleSide,
    });
    let sphereGeometry = new THREE.SphereGeometry(skyDomeRadius, 20, 20);
    let skyDome = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(skyDome);
    skyDome.rotation.x = Math.PI + Math.PI / 6;

    const skyTexture = textureLoader.load("sky.png");
    skyTexture.offset.set(0.0, 0.1);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: skyTexture,
      transparent: true,
    });

    let planeGeo = new THREE.PlaneGeometry(200, 200);
    let planeBackground = new THREE.Mesh(planeGeo, planeMaterial);
    planeBackground.position.z = -50;
    planeBackground.position.y = 0;

    let textBool = false;

    if (font.textMesh) {
      font.textMesh.lookAt(cameraMain.position);
    }

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();
      requestAnimationFrame(draw);
      if (rose.mixer) rose.mixer.update(delta);
      if (fox.mixer) fox.mixer.update(delta);
      if (prince.mixer) prince.mixer.update(delta);

      if (keyController.keys["Space"]) {
        startBool = true;
      }

      if (startBool) {
        gsap.to(skyDome.rotation, {
          // x: 2.7,
          x: 2.6,
          ease: "Sine.easeout",
          duration: 40,
          onStart: function () {
            foxWalk();
            setTimeout(() => {
              textBool = true;
              // console.log(roseIntro);
              // gsap.to(roseIntro, { opacity: 0.8, duration: 1 });
            }, 20000);
          },
          onComplete: function () {},
        });

        if (textBool) {
          gsap.to(font.textMeshMaterial, {
            opacity: 0.8,
            duration: 0.6,
          });
          if (keyController.keys["ArrowUp"]) {
            if (cameraMain.position.z === 16.5) {
              gsap.to(cameraMain.position, {
                z: 14.5,
                duration: 1,
                onUpdate: function () {
                  font.textMeshSecond.lookAt(cameraMain.position);
                  gsap.to(font.textMeshSecondMaterial, {
                    opacity: 0.8,
                    duration: 0.6,
                  });
                },
              });
              delete keyController.keys["ArrowUp"];
            } else if (cameraMain.position.z === 14.5) {
              gsap.to(cameraMain.position, {
                z: 12.5,
                duration: 1,
                onUpdate: function () {
                  font.textMeshThird.lookAt(cameraMain.position);
                  gsap.to(font.textMeshThirdMaterial, {
                    opacity: 0.8,
                    duration: 0.6,
                  });
                },
              });
              delete keyController.keys["ArrowUp"];
            } else if (cameraMain.position.z === 12.5) {
              gsap.to(cameraMain.position, {
                z: 10.5,
                duration: 1,
                onUpdate: function () {
                  font.textMeshFourth.lookAt(cameraMain.position);
                  gsap.to(font.textMeshFourthMaterial, {
                    opacity: 0.8,
                    duration: 0.6,
                    onComplete: function () {
                      setTimeout(() => {
                        scene.add(light.spotLightRose);
                      }, 800);
                      setTimeout(() => {
                        gsap.to(font.textMeshFourthMaterial, {
                          opacity: 0,
                          duration: 0.5,
                        });
                      }, 3000);
                      setTimeout(() => {
                        walkBool = true;
                      }, 4000);
                    },
                  });
                },
              });
              delete keyController.keys["ArrowUp"];
            }
          }
        }
      }

      if (walkBool) {
        flowerMove();
      }

      // if (rose.actions[0] && rose.actions[0].time > 2) {
      //   setVideoBool(true);
      // }
      // composer.render();
      renderer.render(scene, cameraMain);
    }

    function setSize() {
      cameraMain.aspect = window.innerWidth / window.innerHeight;

      cameraMain.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, cameraMain);
    }

    function foxWalk() {
      if (fox.actions && fox.modelMesh) {
        if (fox.modelMesh.position.z > 10) {
          scene.add(fox.modelMesh);
          fox.actions[0].play();
          fox.modelMesh.position.z -= 0.02;
          // fox.modelMesh.position.y += 0.01;
        } else {
          fox.actions[0].stop();
          fox.actions[1].play();
          if (fox.actions[1].time > 1.0) {
            fox.actions[2].play();
          }
        }
      }

      if (prince.actions && prince.modelMesh) {
        if (prince.modelMesh.position.z > 10) {
          scene.add(prince.modelMesh);
          prince.actions[1].play();
          prince.modelMesh.position.z -= 0.02;
          // prince.modelMesh.position.y += 0.001;
        } else {
          prince.actions[1].stop();
          prince.actions[0].play();
          if (prince.actions[0].time > 1.0) {
            prince.actions[2].play();
          }
        }
      }
    }

    function flowerMove() {
      scene.add(light.pointLight);
      light.pointLight.position.set(
        rose.jooPosition.x,
        rose.jooPosition.y,
        rose.jooPosition.z
      );
      // console.log(light.pointLight.position);
      gsap.to(cameraMain.position, {
        z: 6,
        duration: 7,
        onUpdate: function () {
          rose.actions[0].play();
          setTimeout(() => {
            setVideoBool(true);
            // navigate("/end");
            scene.clear();
          }, 12000);
        },
      });
    }

    // function princeWalk() {
    //   if (prince.actions && prince.modelMesh) {
    //     if (prince.modelMesh.position.z > 2) {
    //       scene.add(prince.modelMesh);
    //       prince.actions[0].play();
    //       prince.modelMesh.position.z -= 0.05;
    //       // prince.modelMesh.position.y += 0.001;
    //     } else {
    //       prince.actions[0].stop();
    //       prince.actions[1].play();
    //       if (prince.actions[1].time > 1.0) {
    //         prince.actions[2].play();
    //       }
    //     }
    //   }
    // }

    // 이벤트
    window.addEventListener("resize", setSize);
    draw();
  }, []);

  // useEffect(() => {
  //   if (loadBool) {
  //     loadingRef.current.remove();
  //   }
  // }, [loadBool]);

  useEffect(() => {
    // console.log(videoRef.current);
    if (videoBool) {
      videoRef.current.play();
    }
  }, [videoBool]);
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <video
          style={
            videoBool
              ? {
                  // width: "100vw",
                  height: "120vh",
                  overflow: "hidden",
                  position: "absolute",
                  top: -100,
                  left: 0,
                }
              : {
                  display: "none",
                }
          }
          ref={videoRef}
          // controls="controls"
          // autoPlay="autoPlay"
        >
          {/* <source src={video} type="video/mp4" /> */}
        </video>
      </div>

      <div
        style={{ height: "100vh", overflow: "hidden", background: "black" }}
        ref={containerRef}
      >
        {/* <span
          id="roseOpa"
          className="font-hand text-4xl text-slate-50"
          style={{
            position: "absolute",
            top: 500,
            left: width / 2 - 180,
            opacity: 0,
          }}
        >
          장미로 천천히 다가가보세요
        </span> */}
        <iframe
          title="autoPlay"
          src={mySound}
          allow="autoplay"
          id="audio"
          style={{ display: "none", opacity: 0 }}
        ></iframe>
        <audio id="player" autoPlay loop>
          <source src={mySound} type="audio/mp3" />
        </audio>
      </div>
    </>
  );
}

export default Sunset2;
