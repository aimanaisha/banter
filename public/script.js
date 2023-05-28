const socket = io.connect('http://localhost:8000')

const msg = document.getElementById('message')
const handle = document.getElementById('handle')
const send = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

send.addEventListener('click', () => {
    socket.emit('chat_msg', {
        message: message.value,
        handle: handle.value
    })
})

socket.on('chat_msg', (data) => {
    feedback.innerHTML = ''
    output.innerHTML+= '<p>' + data.handle+ ':'+ data.message + '</p>'
})

msg.addEventListener('keypress', () => {
    console.log('?')
    socket.emit('typing', handle.value)
})

socket.on('typing', (data) => {
    if(!data){
        feedback.innerHTML = '<p>A little birdie is typing...</p>'
    }
    else{
        feedback.innerHTML = '<p>' + data + ' is typing a message...</p>'
    }
})