const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

function handleOpen() {
  console.log("Connected to Server!");
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
  console.log(`Just got this: ${message.data} from the Client`);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server X");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
