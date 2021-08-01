import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose(message) {
  console.log("Disconnected From Browser");
}

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket.send("hello!!!");
  console.log("Connected to Server!");
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString()));
  });
  socket.on("close", onSocketClose);
});

server.listen(3000, handleListen);
