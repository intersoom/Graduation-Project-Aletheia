import React, { useRef, useEffect, useState } from "react";

function SnakeEnd() {
  return (
    <>
      <div
        style={{
          overflow: "hidden",
          scroll: "none",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <video width={"100%"} autoPlay="autoPlay">
          {/* <source src={video} type="video/mp4" /> */}
        </video>
      </div>
    </>
  );
}

export default SnakeEnd;
