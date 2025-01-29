import {Server as SocketIoServer, Socket} from 'socket.io';
import { Server } from 'http';

let SocketServer: SocketIoServer;

export function initSockets({ server: expressServer }: { server: Server }) {
    SocketServer = new SocketIoServer(expressServer, {
        cors: {
            credentials: true,
            origin: ['http://localhost:5173'],
        },
        maxHttpBufferSize: 1e8,
    });

    SocketServer.on('connection', (socket) => {
        console.info(`New socket connected`);

        socket.on('order', (message: any) => {
            console.log('📦 Received order message:', message);
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
