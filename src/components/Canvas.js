import React, { useRef, useEffect, useState } from "react";
import { WaveGroup } from "../class/WaveGroup";
import space from "../img/space.png";
import { KeyController } from "../utils/KeyController";
import { getDatabase, ref, set } from "firebase/database";

function Canvas({ props }) {
  const containerRef = useRef(null);
  const propsRef = useRef(props);
  const [requestId, setRequestId] = useState();
  const [bg, setBg] = useState(true);
  const [aletheia, setAletheia] = useState("");
  const keyController = new KeyController();
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  useEffect(() => {
    if (keyController.keys["Enter"]) {
      console.log(aletheia);
      const db = getDatabase();
      set(ref(db, "altheia"), {
        mine: aletheia,
      });
    }
  }, [keyController.keys["Enter"]]);

  useEffect(() => {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    const context = canvas.getContext("2d");
    // Class
    const waveGroup = new WaveGroup({ stageHeight });
    // let requestId;
    let i = 0;
    const random = [100, 60, 80, 130, 110];
    let zeroAni = 1;
    let openAni = 0;
    let done = false;
    containerRef.current.appendChild(canvas);

    // 이벤트
    window.addEventListener("resize", resize, false);
    resize();

    function resize() {
      canvas.width = stageWidth * 2;
      canvas.height = stageHeight * 2;
      context.scale(2, 2);
      waveGroup.resize(stageWidth, stageHeight);
    }
    let startTime = new Date().getTime();

    const draw = () => {
      if (context) {
        context.clearRect(0, 0, stageWidth, stageHeight);
      }

      if (keyController.keys["Enter"] || done) {
        done = true;
        if (zeroAni > 0) {
          zeroAni -= 0.01;
        }
        if (openAni < 70) {
          setBg(false);
          openAni += 0.2;
        }
        if (keyController.keys["Enter"]) {
          console.log(aletheia);
          const db = getDatabase();
          set(ref(db, "altheia"), {
            mine: aletheia,
          });
        }

        // openAni = 70;
        // zeroAni = 0;

        waveGroup.draw(context, 0, 0, zeroAni, openAni);
      } else if (!done) {
        waveGroup.draw(context, Math.random() * 200, Math.random() * 200, 1, 0);
      }
      setRequestId(requestAnimationFrame(draw));
    };

    requestAnimationFrame(draw);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: bg ? "black" : `white`,
      }}
      onClick={() => {}}
      ref={containerRef}
    >
      <input
        value={aletheia}
        onChange={(e) => {
          setAletheia(e.target.value);
        }}
        className="font-hand focus:outline-none text-7xl text-[#f2f2f2]"
        style={{
          position: "absolute",
          top: height / 2 - 100,
          left: width / 2 - 250,
          width: 500,
          height: 200,
          textAlign: "center",
          opacity: 0.7,
          background: "none",
        }}
      ></input>
    </div>
  );
}

export default Canvas;
