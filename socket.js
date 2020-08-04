var io = require('socket.io-client');
const socket = io.connect('http://localhost:3003', { reconnect: true });

socket.on('broadcast', (obj) => message(obj));
socket.on('login', (o) => logIn(o));
socket.on('logout', (o) => logOut(o));

logIn = (o) => {
    console.log('login');
}

logOut = (o) => {
    console.log('logot');
}

message = (obj) => {
    console.log(obj);
}

module.exports = {
    socket,
}