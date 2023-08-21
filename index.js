const express = require("express")
const app = express()

const path = require("path")
const http = require("http")
const {Server} = require("socket.io")

const server = http.createServer(app)

const io = new Server(server) 
app.use(express.static(path.resolve("")))

let arr=[];
let players=[]
let endcell

io.on("connection", (socket) => {
  socket.on("join", (e) => {
    console.log('sad')
    if(e.name!=null){
      arr.push(e.name)
      console.log('got')
      if(arr.length >= 2) {
        let player1 = {
          p1:arr[0],
          p1color:"black",
          p1move:""
        }
        let player2 = {
          p2:arr[1],
          p2color:"white",
          p2move:""
        }
        let obj = {
          p1: player1,
          p2: player2
        }
        players.push(obj)
        arr.splice(0,2)
        io.emit("join", {players: players})
        console.log('sent')
      }
    }
  })
  socket.on("next", (data)=> {
    console.log(data.end); // This should log the endcell ID
    console.log(data.elem); // This should log the dragelement ID
    if (data.end && data.elem) {
      socket.broadcast.emit("next", {end: data.end, elem: data.elem});
      console.log("senttext");
    }
  })
})

app.get("/", (req, res) => {
  return res.sendFile("/Users/nclliu/Desktop/pp/gomoku/gomoku.html")
})

server.listen(3000, () => {
  console.log("connected to 3000!")
})