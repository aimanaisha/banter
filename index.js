const express = require('express')
const socket = require('socket.io')

const app = express()

const server = app.listen(8000, () => {
    console.log('listening to requests on port 8000')
})
app.use(express.static('public'))                          //connecting to all static files in public folder

const io = socket(server)

io.on('connection', (socket) => {                           //making connection
    console.log('made connection', socket.id)

    socket.on('chat_msg', (data) => {
        io.sockets.emit('chat_msg', data)                    //sending the incoming chat_msg to all the sockets connected
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
})