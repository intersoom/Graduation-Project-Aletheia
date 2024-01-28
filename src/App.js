import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Intro from "./scene/Intro";
import Sunset from "./scene/Sunset";
import Sunset2 from "./scene/Sunset2";
import Essential from "./scene/Essential";
import WaveScene from "./scene/WaveScene";
import WaveVideo from "./scene/WaveVideo";
import EndingVideo from "./scene/EndingVideo";
import WaveScene2 from "./scene/WaveScene2";
import Tutorial from "./scene/Tutorial";
import VideoIntro from "./scene/VideoIntro";
import SnakeEnd from "./scene/SnakeEnd";
import Start from "./scene/Start";

function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Intro />} />
        <Route path="/essential" element={<Essential />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/sunset" element={<Sunset />} />
        <Route path="/sunset2" element={<Sunset2 />} />
        <Route path="/wave" element={<WaveScene />} />
        <Route path="/wave2" element={<WaveScene2 />} />
        <Route path="/waveVideo" element={<WaveVideo />} />
        <Route path="/end" element={<EndingVideo />} />
        <Route path="/intro" element={<VideoIntro />} />
        <Route path="/snakeEnd" element={<SnakeEnd />} />
        <Route path="/" element={<Start />} />
        <Route path="/v2/main" element={<Start />} />
      </Routes>
    </>
  );
}

export default App;
