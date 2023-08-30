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
          p2: player2,
          sum: 0
        }
        players.push(obj)
        arr.splice(0,2)
        io.emit("join", {players: players})
        console.log('sent')
      }
    }
  })
  socket.on("next", (data)=> {
    if (data.elem == "black") {
      let tochange = players.find(obj=>obj.player1.p1 === data.name)
      tochange.p2.p2move = data.end
      tochange.sum++
    }
    if (data.end && data.elem) {
      socket.broadcast.emit("next", {end: data.end, elem: data.elem, players: players});
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