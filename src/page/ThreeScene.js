import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeScene = () => {
  const container2Ref = useRef(null);

  useEffect(() => {
    const width = container2Ref.current.clientWidth;
    const height = container2Ref.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    container2Ref.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    camera.position.z = 1;

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.x = 1;
    directionalLight.position.z = 3;
    scene.add(directionalLight);

    // Load the glTF model
    const loader = new GLTFLoader();

    // Load a new texture for the model
    const textureLoader = new THREE.TextureLoader();

    // textureLoader.load(
    //   "newTexture.jpeg",
    //   (texture) => {
    //     // Access the material and change its map property to the new texture
    //     dalObj.children[0].children[0].children[0].material.map = texture;
    //   },
    //   undefined,
    //   (error) => {
    //     console.error(error);
    //   }
    // );

    let dalObj;
    let mixer;
    loader.load(
      "princewalk.glb",
      (gltf) => {
        dalObj = gltf.scene;
        console.log(dalObj);
        console.log(gltf.animations);
        scene.add(dalObj);

        mixer = new THREE.AnimationMixer(dalObj);
        const actions = [];
        actions[0] = mixer.clipAction(gltf.animations[0]);
        actions[0].play();
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    const clock = new THREE.Clock();

    const animate = function () {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);

      if (mixer) {
        mixer.update(delta);
      }

      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return (
    <div
      style={{ height: "100vh", background: "#000000", overflow: "hidden" }}
      ref={container2Ref}
    />
  );
};

export default ThreeScene;
