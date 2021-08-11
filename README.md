# Noom

<img src="./gitImages\Logo.JPG">

NodeJS & WebRTC & WebSocket을 사용하여 Zoom 클론코딩

이번 강좌에선 WebRTC의 시작과 끝을 알아보았다. 아래 소스코드를 참고

해당 강좌는 노마드코더 니콜라스님의 영상을 보고 제작되었음을 미리 밝힙니다.

<a href="https://nomadcoders.co/noom/lobby">강좌로 이동</a>

<img src="./gitImages\CourseLogo.JPG">

### 소스설명

```javascript
// Socket.io 와 Ws 를 사용하며 CORS 에러 방지를 위해 옵션을 넣어줌
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

// wsServer 에서 연결이 되었을 때, on 메서드로 접수함
wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    socket.to("roomName").emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

// 카메라 연결
async function getCameras() {
  try {
    // navigator 객체에서 연결된 장비를 가져오는 메서드를 호출함
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind == "videoinput");
    // getVideoTracks 내부에 정보를 갖고있음
    const currentCamera = myStream.getVideoTracks()[0];
    cameras.forEach((camera) => {
      const option = document.createElement("option");
      option.value = camera.deviceId;
      option.innerText = camera.label;
      if (currentCamera.label === camera.label) {
        option.selected = true;
      }
      camerasSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e);
  }
}

// 연결된 기기의 Id를 확인함
async function getMedia(deviceId) {
  const initialConstrains = {
    audio: true,
    video: { facingMode: "user" },
  };
  const cameraConstrains = {
    audio: true,
    video: { deviceId: { exact: { deviceId } } },
  };
  try {
    // 오디오 비디오의 정보를 저장함
    myStream = await navigator.mediaDevices.getUserMedia(
      deviceId ? cameraConstrains : initialConstrains
    );
    myFace.srcObject = myStream;
    if (!deviceId) {
      await getCameras();
    }
  } catch (e) {
    console.log(e);
  }
}

// 외부에서 연결이 가능하도록 iceServer에 연결
function makeConnection() {
  myPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun3.l.google.com:19302",
          "stun:stun4.l.google.com:19302",
        ],
      },
    ],
  });
  myPeerConnection.addEventListener("icecandidate", handleIce);
  myPeerConnection.addEventListener("addstream", handleAddStream);
  myStream
    .getVideoTracks()
    .forEach((track) => myPeerConnection.addTrack(track, myStream));
}
```

### 화면 구현

방을 선택
<img src="./gitImages\SelectRoom.JPG">

비디오 출력

<img src="./gitImages\VideoRoom.JPG">
