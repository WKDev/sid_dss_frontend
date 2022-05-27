import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import "../css/StreamContainer.css"
import ReactPlayer from 'react-player/lazy'

const url = "http://127.0.0.1:8080/inf/1"



function StreamContainer(props) {

  return (
    <div className="st-container">
      {/* <Image fluid="true" src={stream_img} alt="img_loading" ></Image> */}
      <iframe className="inline-frame" src={props.location}></iframe>
      {/* <img src={props.img}/> */}



    </div>
  );
}

export default StreamContainer;
