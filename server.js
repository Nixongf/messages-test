const path = require("path");
const express = require('express');
const app = express();



//Aqui se inicializa el servidor
// settings  
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname,'public')))
// es path.join es para que puede ser abierta en linux y windows 

// start the server 
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// end server 


// socketio
const SocketIO = require('socket.io')
const io = SocketIO(server);

// web socket
// el socket de chatjs se recibe aqui
io.on('connection', (socket)=>{
    console.log('new conection: ', socket.id); 
    // socket.id es para poder saber el token de coneccion
    //con el on se recibe la informacion de chat.js
    socket.on('chat:message', (data) =>{
        io.sockets.emit('chat:message', data);
        //io.sockets es para enviar informacion a todos los que se encuentran conectados
    });

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit("chat:typing", data);
    });
});
