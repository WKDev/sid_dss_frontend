import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/NavBar'
import { Col, Container, Row, ThemeProvider } from 'react-bootstrap';
import StreamLayout from './components/StreamLayout';
import ControlLayout from './components/ControlLayout';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';

import React from 'react'
import ReactTimeAgo from 'react-time-ago'

// add Toast 
function App() {
  const [show, setShow] = useState(false);
  const [birdShow, setBirdShow] = useState(false);
  const [bugShow, setBugShow] = useState(false);

  const [msg, setMsg] = useState({ code: "0", style: "primary", toast_title: "Blank", toast_msg: "Blank", time: Number(Math.floor(new Date().getTime() / 1000)) });
  const [birdMsg, setBirdMsg] = useState({ code: "0", style: "primary", toast_title: "Blank", toast_msg: "Blank", time: Number(Math.floor(new Date().getTime() / 1000)) });
  const [bugMsg, setBugMsg] = useState({ code: "0", style: "primary", toast_title: "Blank", toast_msg: "Blank", time: Number(Math.floor(new Date().getTime() / 1000)) });

  const [pref, setPref] = useState({ en_ext: false, ext_ovelay: false, bug: false, bug_overlay: false });


  // useEffect(() => {
  //   ws.onopen = () => {   // 연결!
  //     console.log("notification channel connected")
  //   }

  //   //   sendMessage = () => {  // 화살표함수로 만들것!!
  //   //     ws.send("hello this is client Message");  // 서버로 메세지 보내는건 send
  //   //   };
  // }, [])

  // useEffect(()=>{
  //   ws.onmessage = (msg) => {
  //     setShow(true)
  //     setMsg(JSON.parse(msg.data))

  //     // console.log(typeof(msg.data))
  //     // console.log(JSON.parse(msg.data))
  //     // console.log(JSON.parse(msg.data).style)

  //   };
  // })






  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/notification");
    ws.current.onopen = () => console.log("ws_for notification opened");
    ws.current.onclose = () => console.log("ws_for notification closed");

    const wsCurrent = ws.current;



    // return () => {
    //     wsCurrent.close();
    // };
  }, []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.onmessage = e => {
      const parsed = JSON.parse(e.data)

      console.log(parsed)
      // init_json = {'code': str(101), 'en-ext': str(enable_extermination), 'ext-overlay': str(enable_bird_overlay), 'en-ext': str(enable_bugdetection), 'bug-overlay': str(enable_bug_overlay),}
      if (parsed.code === "202") {
        setMsg(parsed)
        setShow(true)
      }
      if (parsed.code === "101") {
        setPref(parsed)
      }
      if (parsed.code === "0") {
        setBugMsg(parsed)
        setBugShow(true)
      }
      if (parsed.code === "1") {
        setBirdMsg(parsed)
        setBirdShow(true)
      }

      console.log(JSON.parse(e.data))

    };
  });


  const showFext = () => {
    setMsg({ code: "0", style: "warning", toast_title: "Alert", toast_msg: "Forced Extermination executed.", time: Number(Math.floor(new Date().getTime() / 1000)) })
    setShow(true)
  }

  const showDummyToast = () => {
    setMsg({ code: "0", style: "light", toast_title: "Alert", toast_msg: "demo stream enabled.", time: Number(Math.floor(new Date().getTime() / 1000)) })
    setShow(true)
  }


  return (
    <div className="App">
      <NavBar />
      <Container className="ancst-container" >
        <ThemeProvider prefixes={{ row: 'ancest-row' }}>

          <Row prefixes="ancest-row">
            <Col className="custom-fit-col">
              <StreamLayout></StreamLayout>
            </Col>
            <Col xs lg="6" className="custom-fit-col2">
              <ControlLayout data={pref} showToast={showFext} showDummy={showDummyToast} ></ControlLayout>
            </Col>

          </Row>

          
        </ThemeProvider>
      </Container>
      <div
        // aria-live="polite"
        // aria-atomic="true"
        // className="bg-dark position-relative"
        // style={{ minHeight: '240px' }}
      >
      <ToastContainer className="p-3" position='bottom-end'>
        <Toast bg={msg.style} onClose={() => setShow(false)} show={show} delay={5000} autohide key='0'>
          <Toast.Header>
            <strong className="me-auto">{msg.toast_title}</strong>
            <small>
              <ReactTimeAgo date={Number(new Date())} locale="en-US" />
            </small>
          </Toast.Header>
          <Toast.Body>{msg.toast_msg}</Toast.Body>
        </Toast>
        <Toast bg={birdMsg.style} onClose={() => setBirdShow(false)} show={birdShow} delay={5000} autohide key='1'>
          <Toast.Header>
            <strong className="me-auto">{birdMsg.toast_title}</strong>
            <small>
              <ReactTimeAgo date={Number(new Date())} locale="en-US" />
            </small>
          </Toast.Header>
          <Toast.Body>{birdMsg.toast_msg}</Toast.Body>
        </Toast>

        <Toast bg={bugMsg.style} onClose={() => setBugShow(false)} show={bugShow} delay={5000} autohide key='2'>
          <Toast.Header>
            <strong className="me-auto">{bugMsg.toast_title}</strong>
            <small>
              <ReactTimeAgo date={Number(new Date())} locale="en-US" />
            </small>
          </Toast.Header>
          <Toast.Body>{bugMsg.toast_msg}</Toast.Body>
        </Toast>
      </ToastContainer>
      </div>
    </div>
  );
}

export default App;
