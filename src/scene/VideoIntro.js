import { useNavigate } from "react-router-dom";
import video from "../video/intro1.mp4";
import video2 from "../video/intro2.mp4";
import video3 from "../video/intro3.mp4";
import video4 from "../video/intro4.mp4";
import video5 from "../video/intro5.mp4";
import mySound from "../sound/tutorial.mp3";
import { useEffect, useRef, useState } from "react";

function VideoIntro() {
  const videoRef = useRef(null);
  const [next, setNext] = useState(0);
  const navigate = useNavigate();

  const sentences = [
    "어느날, 어린왕자가 사는 행성에 장미가 피어났습니다.",
    "어린왕자는 아름다운 장미를 보고 사랑에 빠집니다.",
    "장미도 어린왕자를 사랑했지만, 장미는 어린 왕자에게 까칠하기만 했습니다.",
    "결국 어린왕자는 장미에게 지쳐 행성을 떠나게 되고,\n장미는 후회하며 떠나는 어린왕자에게 마지막으로 사랑한다고 합니다.",
    "행성을 떠나 지구로 도착한 어린왕자는 수많은 장미를 보며 실망을 합니다.\n자신이 사랑한 장미가 유일한 꽃이 아니라 그저 평범하고 무수히 많은 장미꽃들 중에 하나였다는 사실을 알고서 말이죠.",
  ];

  const handleNext = () => {
    if (next === 4) {
      navigate("/tutorial");
    }
    setNext(next + 1);
  };

  const handlePrev = () => {
    if (next > 0) {
      setNext(next - 1);
    }
  };

  useEffect(() => {
    console.log(videoRef);
  }, [videoRef]);

  const arrow = ">";
  const arrow2 = "<";

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center h-4/6">
        {next === 0 && (
          <video width={"70%"} autoPlay="autoPlay">
            <source src={video} type="video/mp4" />
          </video>
        )}
        {next === 1 && (
          <video width={"70%"} autoPlay="autoPlay">
            <source src={video2} type="video/mp4" />
          </video>
        )}
        {next === 2 && (
          <video width={"70%"} autoPlay="autoPlay">
            <source src={video3} type="video/mp4" />
          </video>
        )}
        {next === 3 && (
          <video width={"70%"} autoPlay="autoPlay">
            <source src={video4} type="video/mp4" />
          </video>
        )}
        {next === 4 && (
          <video width={"70%"} autoPlay="autoPlay">
            <source src={video5} type="video/mp4" />
          </video>
        )}
      </div>

      <div className=" font-hand text-3xl text-gray-100 opacity-90 whitespace-pre-wrap text-center">
        {sentences[next]}
      </div>
      <div className="flex flex-row w-full justify-between">
        {next > 0 ? (
          <div
            className="text-gray-100 opacity-90 mt-10 ml-20 self-end cursor-pointer hover:opacity-40"
            onClick={handlePrev}
          >
            {`${arrow2} PREV`}
          </div>
        ) : (
          <div className="text-black mt-10 ml-20 self-end" onClick={handlePrev}>
            {`${arrow2} PREV`}
          </div>
        )}
        {next < 5 ? (
          <div
            className="text-gray-100 opacity-90 mt-20 mr-20 self-end cursor-pointer hover:opacity-40"
            onClick={handleNext}
          >
            {`NEXT ${arrow}`}
          </div>
        ) : (
          <div className="text-black mt-20 ml-20 self-end" onClick={handlePrev}>
            {`NEXT ${arrow}`}
          </div>
        )}
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
    </div>
  );
}
export default VideoIntro;
