const socket = io()  // para ejecutar y poder conectar al servidor
// este socket es todo el codigo del frontend que va a poder enviar los eventos al servidor

// DOm elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function(){
    //emit : enviar los strings al servidor 
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', function(){
    console.log(username.value)
    socket.emit('chat:typing', username.value);
});
    // on : escucha el evento que se emite desde el servidor 
socket.on('chat:message', function(data){
    //console.log(data);
    actions.innerHTML = '';
    output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
    // el += es para que las etiquetas p se puedan agregar dentro del aoutput
});

socket.on('chat:typing', function(data){
    console.log(data);
    actions.innerHTML = `<p><em>${data} esta escribiendo ...</em></p>`;
});