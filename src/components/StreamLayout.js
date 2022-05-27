import StreamContainer from './StreamContainer';
import { Col, Container, Row } from 'react-bootstrap';
import '../css/StreamLayout.css'

import axios from 'axios'
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';


function StreamLayout() {
  // [isBd1, setIsBd1] = useState(False)

  const [bd1, setBd1] = useState('')
  const [bd2, setBd2] = useState('')


  // const ws_bd1 = new WebSocket("ws://localhost:8080/bd1");
  // const ws_bd2 = new WebSocket("ws://localhost:8080/bd2");


  // useEffect(() => {
  //   ws_bd1.onopen = () => {   // 연결!
  //     console.log("bd1_connected!!")
  //   }

  //   //   sendMessage = () => {  // 화살표함수로 만들것!!
  //   //     ws.send("hello this is client Message");  // 서버로 메세지 보내는건 send
  //   //   };


  //   ws_bd2.onopen = () => {   // 연결!
  //     console.log("bd2_connected!!")
  //   }
  //   ws_bd2.onmessage = (msg) => {
  //     setBd2(msg.data)

  //   };
  //   setInterval(() => {
  //     ws_bd1.send('img1')

  //     // ws_bd2.send('echo')

  //   }, 60)
  //   ws_bd1.onmessage = (msg) => {

  //     setBd1(msg.data)
  //     // console.log(msg.data)
  //   };

  //   ws_bd2.onmessage = (msg) => {
  //     setBd2(msg.data)
  //     // console.log(msg.data)
  //   };

  //   return () => {
  //     console.log("clean up");
  //     // ws_bd1.close();
  //     // ws_bd2.close();

  //   };
  // })


  // const ws = useRef(null);
  // const ws2 = useRef(null);


  // useEffect(() => {
  //   ws.current = new WebSocket("ws://localhost:9090");
  //   ws.current.onopen = () => console.log("ws_for stream opened");
  //   ws.current.onclose = () => console.log("ws_for stream closed");
  //   ws2.current = new WebSocket("ws://localhost:9090/bd2");
  //   ws2.current.onopen = () => console.log("ws_for stream 2 opened");
  //   ws2.current.onclose = () => console.log("ws_for stream 2 closed");

  //   const wsCurrent = ws.current;

  //   // return () => {
  //   //     wsCurrent.close();
  //   // };
  // }, []);

  // useEffect(() => {
  //   if (!ws.current) return;

  //   ws.current.onmessage = e => {
  //     // ws.send('img1')
  //     setBd1(e.data)
  //     console.log(e.data)

  //   };
  // });

  // useEffect(() => {
  //   if (!ws2.current) return;

  //   ws2.current.onmessage = e => {
  //     setBd2(e.data)

  //   };
  // });



  return (
    <div className="StreamLayout">
      <Container className="custom-fit-left">
        <Row>
          <Col className="custom-fit-col">
            <StreamContainer location="http://127.0.0.1:8080/inf/1" />
          </Col>
          <Col className="custom-fit-col">
            <StreamContainer location="http://127.0.0.1:8080/inf/2" />
          </Col>
        </Row>

        <Row className="custom-fit-row">
          <Col className="custom-fit-col">
            <StreamContainer location="http://192.168.0.102:5000/1" />
          </Col>
          <Col className="custom-fit-col">
            <StreamContainer location="http://127.0.0.1:8080/bug" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StreamLayout;
