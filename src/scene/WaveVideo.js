import { useNavigate } from "react-router-dom";
// import video from "../video/chapter2.mp4";

function WaveVideo() {
  const navigate = useNavigate();
  return (
    <div style={{ overflow: "hidden", width: "100vw", height: "100vh" }}>
      <video
        width={"100%"}
        height={"100%"}
        // controls="controls"
        autoPlay="autoPlay"
        onEnded={() => {
          navigate("/wave");
        }}
      >
        {/* <source src={video} type="video/mp4" /> */}
      </video>
    </div>
  );
}
export default WaveVideo;
