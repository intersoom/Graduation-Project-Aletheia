// import React, { useEffect, useRef, useState } from "react";
// import { useRecoilState, useSetRecoilState } from "recoil";
// import { currentRef, currentSceneIndexAtom } from "../recoil/sceneState";
// import { scenes } from "../scene/scenes";

// function ThreeScene2() {
//   const [currentSceneIndex, setCurrentSceneIndex] = useRecoilState(
//     currentSceneIndexAtom
//   );
//   const containerRef = useRef(null);
//   const [scene, setScene] = useState();
//   scenes[currentSceneIndex].scene({ ref: containerRef }); // initialize with the first scene

//   // handle scene switching
//   const handleSceneSwitch = (index) => {
//     setCurrentSceneIndex(index);
//     // scenes[index].scene.dispose();
//     setScene(scenes[index].scene({ ref: containerRef }));
//   };

//   useEffect(() => {
//     function animate() {
//       requestAnimationFrame(animate);

//       // Add any necessary update logic here
//       scene.render();
//     }

//     animate();
//   }, [scene]);

//   return (
//     <div>
//       <button onClick={() => handleSceneSwitch(0)}>Scene 1</button>
//       <button onClick={() => handleSceneSwitch(1)}>Scene 2</button>
//       <div
//         style={{ height: "100vh", background: "#000000", overflow: "hidden" }}
//         ref={containerRef}
//       />
//     </div>
//   );
// }

// export default ThreeScene2;
