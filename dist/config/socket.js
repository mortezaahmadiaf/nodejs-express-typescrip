"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
class Socket {
    constructor(socket) {
        this.socket = socket;
        this.chate = socket.of('/chat');
        this.socketMiddleware();
        this.runSocket();
    }
    socketMiddleware() {
        this.socket.use((socket, next) => {
            next();
        });
        this.chate.use((socket, next) => {
            next();
        });
    }
    runSocket() {
        this.chate.on('connection', (socket) => {
            console.log('chat connection');
            socket.send('data chat');
            socket.emit('test', 'hello from server chat');
            socket.on('message', (data) => {
                console.log(data);
            });
            socket.on('disconnect', () => {
                console.log('device is offline');
            });
        });
        this.socket.on('connection', (socket) => {
            console.log('connection');
            socket.send('data');
            socket.emit('test', 'hello from server');
            socket.on('message', (data) => {
                console.log(data);
            });
            socket.on('disconnect', () => {
                console.log('device is offline');
            });
        });
    }
}
exports.Socket = Socket;
