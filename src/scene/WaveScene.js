import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { WaveGroup } from "../class/WaveGroup";
import Canvas from "../components/Canvas";
import { useNavigate } from "react-router-dom";
import { KeyController } from "../utils/KeyController";
import useSound from "use-sound";
import mySound from "../sound/page2.mp3";

function WaveScene() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const [skyUpMax, setSkyUpMax] = useState(0);
  const [terraUpMax, setTerraUpMax] = useState(0);
  const [playSound, { isPlaying }] = useSound(mySound);

  function handleSkyClick() {
    setSkyUpMax((prevState) => (prevState += 1));
    console.log(skyUpMax);
  }

  function handleTerraClick() {
    setTerraUpMax((prevState) => (prevState += 1));
    console.log(terraUpMax);
  }

  const keyController = new KeyController();

  useEffect(() => {
    !isPlaying && playSound();
  }, [isPlaying]);

  function checkKeyPress() {
    // playSound();
    if (keyController.keys["KeyZ"]) {
      handleSkyClick();
      console.log("ff");
    } else if (keyController.keys["Slash"]) {
      handleTerraClick();
    }
    // else if (keyController.keys["KeyH"]) {
    //   navigate("/sunset2", { replace: false });
    //   navigate(0);
    // } else if (keyController.keys["KeyQ"]) {
    //   playSound();
    // }
  }

  useEffect(() => {
    window.addEventListener("keydown", checkKeyPress);
    return () => {
      window.removeEventListener("keydown", checkKeyPress);
    };
  }, []);

  return (
    <>
      <Canvas props={{ skyUpMax, terraUpMax }} />
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

export default WaveScene;
