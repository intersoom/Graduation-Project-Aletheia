import { useNavigate } from "react-router-dom";
import video from "../video/final.mp4";

function EndingVideo() {
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <video
        width={"100%"}
        height={"100%"}
        // controls="controls"
        autoPlay="autoPlay"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}
export default EndingVideo;
