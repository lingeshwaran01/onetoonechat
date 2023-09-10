const io=require('socket.io')(9000,{
    cors:{
        origin:['http://localhost:3000']
    }
})
io.on('connection',(socket)=>{
console.log(socket.id)
socket.broadcast.emit('broad',"hellaaao")
socket.on('Message-user',(data,key)=>{
    socket.to(key).emit('client',data)

})
socket.on('join-room',commont=>{
    socket.join(commont)
})
})
