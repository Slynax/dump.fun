import {Server as SocketIoServer, Socket} from 'socket.io';
import { Server } from 'http';
import {websocketMessageHandler} from "../helpers/websocketMessageHandler";

let SocketServer: SocketIoServer;

export function initSockets({ server: expressServer }: { server: Server }) {
    SocketServer = new SocketIoServer(expressServer, {
        cors: {
            credentials: true,
            origin: ['http://localhost:5173'],
        },
        maxHttpBufferSize: 1e8,
    });

    SocketServer.on('connection', (socket: Socket) => {
        socket.join('trades');

        socket.on('message', (data) => {
            console.log('Received message:', data);
            websocketMessageHandler({ socket, data });
        });
    });

    SocketServer.on('disconnect', (socket) => {
        console.info(`Socket disconnected`);
    });

    console.info('Sockets server initialized');
}

export function getSocketServer() {
    return SocketServer;
}
