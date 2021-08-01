const socket = new WebSocket(`ws://${window.location.host}`);

function handleOpen() {
  console.log("Connected to Server!");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log(`Just got this: ${message} from the Client`);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server X");
});

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000);
