const express = require("express")
const app = express()

const path = require("path")
const http = require("https")
const {Server} = require("socket.io")

const server = http.createServer(app)

const io = new Server(server) 
app.use(express.static(path.resolve("")))

app.