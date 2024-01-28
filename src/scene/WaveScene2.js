import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import mySound from "../sound/page3.mp3";
// import video from "../video/chapter2.mp4";
import { SunsetLight } from "../light/SunsetLight";
import {
  MeshLine,
  MeshLineGeometry,
  MeshLineMaterial,
} from "@lume/three-meshline";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

    // Light
    const light = new SunsetLight({ scene });
    function Grad(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    // wave

    const noise = {};
    Grad.prototype.dot2 = function (x, y) {
      return this.x * x + this.y * y;
    };

    Grad.prototype.dot3 = function (x, y, z) {
      return this.x * x + this.y * y + this.z * z;
    };

    var grad3 = [
      new Grad(1, 1, 0),
      new Grad(-1, 1, 0),
      new Grad(1, -1, 0),
      new Grad(-1, -1, 0),
      new Grad(1, 0, 1),
      new Grad(-1, 0, 1),
      new Grad(1, 0, -1),
      new Grad(-1, 0, -1),
      new Grad(0, 1, 1),
      new Grad(0, -1, 1),
      new Grad(0, 1, -1),
      new Grad(0, -1, -1),
    ];

    var p = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];
    // To remove the need for index wrapping, double the permutation table length
    var perm = new Array(512);
    var gradP = new Array(512);

    // This isn't a very good seeding function, but it works ok. It supports 2^16
    // different seed values. Write something better if you need more seeds.
    function seed(seed) {
      if (seed > 0 && seed < 1) {
        // Scale the seed out
        seed *= 65536;
      }

      seed = Math.floor(seed);
      if (seed < 256) {
        seed |= seed << 8;
      }

      for (var i = 0; i < 256; i++) {
        var v;
        if (i & 1) {
          v = p[i] ^ (seed & 255);
        } else {
          v = p[i] ^ ((seed >> 8) & 255);
        }

        perm[i] = perm[i + 256] = v;
        gradP[i] = gradP[i + 256] = grad3[v % 12];
      }
    }

    seed(0);

    /*
    for(var i=0; i<256; i++) {
      perm[i] = perm[i + 256] = p[i];
      gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
    }*/

    // Skewing and unskewing factors for 2, 3, and 4 dimensions
    var F2 = 0.5 * (Math.sqrt(3) - 1);
    var G2 = (3 - Math.sqrt(3)) / 6;

    var F3 = 1 / 3;
    var G3 = 1 / 6;

    // 2D simplex noise
    function simplex2(xin, yin) {
      var n0, n1, n2; // Noise contributions from the three corners
      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin) * F2; // Hairy factor for 2D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var t = (i + j) * G2;
      var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
      var y0 = yin - j + t;
      // For the 2D case, the simplex shape is an equilateral triangle.
      // Determine which simplex we are in.
      var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
      if (x0 > y0) {
        // lower triangle, XY order: (0,0)->(1,0)->(1,1)
        i1 = 1;
        j1 = 0;
      } else {
        // upper triangle, YX order: (0,0)->(0,1)->(1,1)
        i1 = 0;
        j1 = 1;
      }
      // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
      // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
      // c = (3-sqrt(3))/6
      var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
      var y1 = y0 - j1 + G2;
      var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
      var y2 = y0 - 1 + 2 * G2;
      // Work out the hashed gradient indices of the three simplex corners
      i &= 255;
      j &= 255;
      var gi0 = gradP[i + perm[j]];
      var gi1 = gradP[i + i1 + perm[j + j1]];
      var gi2 = gradP[i + 1 + perm[j + 1]];
      // Calculate the contribution from the three corners
      var t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 < 0) {
        n0 = 0;
      } else {
        t0 *= t0;
        n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
      }
      var t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 < 0) {
        n1 = 0;
      } else {
        t1 *= t1;
        n1 = t1 * t1 * gi1.dot2(x1, y1);
      }
      var t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 < 0) {
        n2 = 0;
      } else {
        t2 *= t2;
        n2 = t2 * t2 * gi2.dot2(x2, y2);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].
      return 70 * (n0 + n1 + n2);
    }

    // 3D simplex noise
    function simplex3(xin, yin, zin) {
      var n0, n1, n2, n3; // Noise contributions from the four corners

      // Skew the input space to determine which simplex cell we're in
      var s = (xin + yin + zin) * F3; // Hairy factor for 2D
      var i = Math.floor(xin + s);
      var j = Math.floor(yin + s);
      var k = Math.floor(zin + s);

      var t = (i + j + k) * G3;
      var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.
      var y0 = yin - j + t;
      var z0 = zin - k + t;

      // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
      // Determine which simplex we are in.
      var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
      var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
      if (x0 >= y0) {
        if (y0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        } else if (x0 >= z0) {
          i1 = 1;
          j1 = 0;
          k1 = 0;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        } else {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 1;
          j2 = 0;
          k2 = 1;
        }
      } else {
        if (y0 < z0) {
          i1 = 0;
          j1 = 0;
          k1 = 1;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } else if (x0 < z0) {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 0;
          j2 = 1;
          k2 = 1;
        } else {
          i1 = 0;
          j1 = 1;
          k1 = 0;
          i2 = 1;
          j2 = 1;
          k2 = 0;
        }
      }
      // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
      // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
      // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
      // c = 1/6.
      var x1 = x0 - i1 + G3; // Offsets for second corner
      var y1 = y0 - j1 + G3;
      var z1 = z0 - k1 + G3;

      var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
      var y2 = y0 - j2 + 2 * G3;
      var z2 = z0 - k2 + 2 * G3;

      var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
      var y3 = y0 - 1 + 3 * G3;
      var z3 = z0 - 1 + 3 * G3;

      // Work out the hashed gradient indices of the four simplex corners
      i &= 255;
      j &= 255;
      k &= 255;
      var gi0 = gradP[i + perm[j + perm[k]]];
      var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
      var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
      var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]];

      // Calculate the contribution from the four corners
      var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
      if (t0 < 0) {
        n0 = 0;
      } else {
        t0 *= t0;
        n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
      }
      var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
      if (t1 < 0) {
        n1 = 0;
      } else {
        t1 *= t1;
        n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
      }
      var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
      if (t2 < 0) {
        n2 = 0;
      } else {
        t2 *= t2;
        n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
      }
      var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
      if (t3 < 0) {
        n3 = 0;
      } else {
        t3 *= t3;
        n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
      }
      // Add contributions from each corner to get the final noise value.
      // The result is scaled to return values in the interval [-1,1].
      return 32 * (n0 + n1 + n2 + n3);
    }

    // ##### Perlin noise stuff

    function fade(t) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }

    function lerp(a, b, t) {
      return (1 - t) * a + t * b;
    }

    // 2D Perlin Noise
    function perlin2(x, y) {
      // Find unit grid cell containing point
      var X = Math.floor(x),
        Y = Math.floor(y);
      // Get relative xy coordinates of point within that cell
      x = x - X;
      y = y - Y;
      // Wrap the integer cells at 255 (smaller integer period can be introduced here)
      X = X & 255;
      Y = Y & 255;

      // Calculate noise contributions from each of the four corners
      var n00 = gradP[X + perm[Y]].dot2(x, y);
      var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
      var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
      var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);

      // Compute the fade curve value for x
      var u = fade(x);

      // Interpolate the four results
      return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
    }

    // 3D Perlin Noise
    function perlin3(x, y, z) {
      // Find unit grid cell containing point
      var X = Math.floor(x),
        Y = Math.floor(y),
        Z = Math.floor(z);
      // Get relative xyz coordinates of point within that cell
      x = x - X;
      y = y - Y;
      z = z - Z;
      // Wrap the integer cells at 255 (smaller integer period can be introduced here)
      X = X & 255;
      Y = Y & 255;
      Z = Z & 255;

      // Calculate noise contributions from each of the eight corners
      var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
      var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
      var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
      var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
      var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
      var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
      var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
      var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(
        x - 1,
        y - 1,
        z - 1
      );

      // Compute the fade curve value for x, y, z
      var u = fade(x);
      var v = fade(y);
      var w = fade(z);

      // Interpolate
      return lerp(
        lerp(lerp(n000, n100, u), lerp(n001, n101, u), w),
        lerp(lerp(n010, n110, u), lerp(n011, n111, u), w),
        v
      );
    }

    // camera.position.x = 4;
    // camera.position.y = 15;
    camera.position.z = 100;

    //Animation parameters
    let rows = 1000;
    let cols = 1;
    let verticesHeight = 1;
    let perlinScale = 0.008;
    let waveSpeed = 0.4;
    let waveHeight = 14;

    // perline 조정 + height 조정 같이 해주기 => 안 깨지게
    let rows2 = 1000;
    let cols2 = 1;
    let verticesHeight2 = 1;
    let perlinScale2 = 0.012;
    let waveSpeed2 = 0.3;
    let waveHeight2 = 10;
    // let FPS = 45;
    let startTime = new Date().getTime();

    seed(Math.random());

    function createGeometry() {
      // z <-> x
      let vertices = [];

      for (let x = 0; x < rows; x++) {
        vertices.push(x, 0, 0);
      }

      const geometry = new MeshLineGeometry();
      geometry.setPoints(vertices);
      return geometry;
    }

    const geo = createGeometry();
    const geo2 = createGeometry();

    const pointCloud = new MeshLine(
      geo,
      new MeshLineMaterial({
        color: new THREE.Color("#A2CCB6"),
        // resolution: new THREE.Vector2(4, 4),
      })
    );

    const pointCloud2 = new MeshLine(
      geo2,
      new MeshLineMaterial({
        color: new THREE.Color("#FCEEB5"),
      })
    );

    const pointCloudArr = [];

    for (let i = 0; i < verticesHeight; i++) {
      const temp = pointCloud.clone();
      scene.add(temp);
      temp.translateY(i * 2);
      temp.translateX(-500);
      pointCloudArr.push(temp);
    }

    const pointCloud2Arr = [];

    for (let i = 0; i < verticesHeight2; i++) {
      const temp = pointCloud2.clone();
      // scene.add(temp);
      temp.translateY(-i * 2);
      temp.translateX(-500);
      pointCloud2Arr.push(temp);
    }

    // -------particles-------
    // Geometry
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
      colors[i] = Math.random();
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      vertexColors: true,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let pX;
    let pZ;

    let pX2;
    let pZ2;

    let firstX;
    let secondX;

    function perlinAnimate() {
      let curTime = new Date().getTime();
      let i = 1;
      for (let y = 0; y < verticesHeight; y++) {
        for (let x = 0; x < rows * 2; x++) {
          for (let z = 0; z < cols; z++) {
            pX = x * perlinScale + ((curTime - startTime) / 1000) * waveSpeed;
            pZ = z * perlinScale + ((curTime - startTime) / 1000) * waveSpeed;
            pointCloudArr[y].geometry.attributes.position.array[i] =
              simplex2(pX, pZ) * waveHeight + y * 2;
            i += 3;
            firstX = x;
            pointCloudArr[y].geometry.getAttribute(
              "position"
            ).needsUpdate = true;
          }
        }
      }

      i = 1;
      for (let y = 0; y < verticesHeight2; y++) {
        for (let x = 0; x < rows2 * 2; x++) {
          for (let z = 0; z < cols2; z++) {
            pX2 =
              x * perlinScale2 + ((curTime - startTime) / 1000) * waveSpeed2;
            pZ2 =
              z * perlinScale2 + ((curTime - startTime) / 1000) * waveSpeed2;
            pointCloud2Arr[y].geometry.attributes.position.array[i] =
              -simplex2(pX2, pZ2) * waveHeight2 - y * 2;
            i += 3;
            secondX = x;
            pointCloud2Arr[y].geometry.getAttribute(
              "position"
            ).needsUpdate = true;
          }
        }
      }
      pointCloud.geometry.computeVertexNormals();

      return {
        first: simplex2(pX, pZ) * waveHeight,
        second: -simplex2(pX2, pZ2) * waveHeight2,
        firstX,
        secondX,
      };
    }

    const lineArr = [];

    function particleInit() {
      const rand = THREE.MathUtils.randFloatSpread;
      const colors = [
        [10, 0.5, 2],
        [1, 2, 10],
        "#A2CCB6",
        "#FCEEB5",
        "#EE786E",
        "#e0feff",
      ];

      for (let j = 0; j < 10; j++) {
        const points = [];
        const speed = Math.max(0.1, 1 * Math.random());
        for (let k = 0; k < 5; k++) {
          points.push(
            new THREE.Vector3(rand(20), 25 + rand(50), rand(40)).clone()
          );
        }
        const curve = new THREE.CatmullRomCurve3(points).getPoints(300);
        const geometry = new MeshLineGeometry();
        geometry.setPoints(curve);

        const material = new MeshLineMaterial({
          color: new THREE.Color(
            colors[parseInt(colors.length * Math.random())]
          ),
          lineWidth: 0.2,
          depthWrite: false,
          dashArray: 0.25,
          dashRatio: 0.94,
          toneMapped: false,
          transparent: true,
        });

        const line = new MeshLine(geometry, material);
        line.rotation.z = -Math.PI / 6;
        lineArr.push(line);
        scene.add(line);
      }
    }

    function particleAnimate(delta) {
      for (let i = 0; i < 10; i++) {
        const speed = Math.max(0.1, 1 * Math.random());
        lineArr[i].material.dashOffset -= (delta * speed * 3) / 10;
        lineArr[i].material.opacity -= Math.sin(delta / 1.2);
      }
    }

    const clock = new THREE.Clock();

    particleInit();

    const controls = new OrbitControls(camera, renderer.domElement);
    function draw() {
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;
      requestAnimationFrame(draw);
      const { first, second, firstX, secondX } = perlinAnimate();
      particleAnimate(delta * 3);
      controls.update();
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
