import { useNavigate } from "react-router-dom";
import faceImg from "../img/face.png";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Player } from "../class/Player";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TutorialLight } from "../light/TutorialLight";

function Start() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  let rot = 0;

  useEffect(() => {
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      // alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    containerRef.current.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    // scene.color = new THREE.Color("black");
    scene.fog = new THREE.Fog(0xaaaaaa, 50, 2000);

    const camera = new THREE.PerspectiveCamera(70, 1000);
    camera.position.z = 200;
    camera.lookAt(0, 0, 0);

    const light = new TutorialLight({ scene });

    const positions = new Float32Array(3000);

    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < 3000; i++) {
      positions[i] = (Math.random() - 0.5) * 400;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xffffff,
    });
    const starField = new THREE.Points(geometry, material);
    scene.add(starField);

    const gltfLoader = new GLTFLoader();

    const player = new Player({
      scene,
      gltfLoader,
      start: true,
      modelSrc: "fastfast.glb",
    });

    function render() {
      if (player.modelMesh) {
        player.modelMesh.rotation.y += 0.01;
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    render();

    window.addEventListener("resize", onResize);

    function onResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    onResize();
  }, []);

  return (
    <>
      <div ref={containerRef}>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span className="text-[#ffffff] text-8xl">THE LITTLE PRINCE</span>
          <span
            className="hover:text-[#f2f2f2] cursor-pointer text-4xl mt-20"
            onClick={() => {
              navigate("/intro");
            }}
          >
            START
          </span>
        </div>
      </div>

      {/* <div
        className="flex justify-center items-center flex-col"
        style={{ height: "100vh", overflow: "hidden", background: "#c1ad8f" }}
      >
        <span
          className="font-hand text-7xl hover:text-[#f2f2f2] cursor-pointer"
          onClick={() => {
            navigate("/intro");
          }}
        >
          START
        </span>
      </div> */}
      {/* <img src={faceImg} alt="face" className="w-[500px] absolute bottom-0" /> */}
    </>
  );
}

export default Start;
