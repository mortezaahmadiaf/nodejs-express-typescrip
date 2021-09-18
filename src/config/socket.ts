import { Server, Namespace } from 'socket.io';
class Socket {

    private socket: Server;
    private test: Namespace

    constructor(socket: Server) {
        this.socket = socket;
        this.test = socket.of('/test')
        this.socketMiddleware();
        this.runSocket();
    }

    private socketMiddleware(): void {
        this.socket.use((socket, next) => {
            next()
        });
        this.test.use((socket, next) => {
            next()
        });
    }

    private runSocket(): void {

        this.test.on('connection', (socket) => {
            console.log('connect to test Socket');
            socket.send('hello test');
            socket.emit('test', 'hello from server');


            socket.on('disconnect', () => {
                console.log('device is offline')
            })

        });

        this.socket.on('connection', (socket) => {
            console.log('connection');
            socket.send('data');
            socket.emit('test', 'hello from server');
            socket.on('message', (data) => {
                console.log(data);
            });

            socket.on('disconnect', () => {
                console.log('device is offline')
            })
        });
    }
}

export {
    Socket
};


// const orderNamespace = io.of("/orders");

// orderNamespace.on("connection", (socket) => {
//   socket.join("room1");
//   orderNamespace.to("room1").emit("hello");
// });