import { Server as SocketIoServer } from 'socket.io';
import { Server } from 'http';

import { AuthentificatedSocketConnection } from './types';

let SocketServer: SocketIoServer;

export function initSockets({ server: expressServer }: { server: Server }) {
    SocketServer = new SocketIoServer(expressServer, {
        cors: {
            credentials: true,
            origin: ['http://localhost:5173'],
        },
        maxHttpBufferSize: 1e8,
    });

    SocketServer.on('connection', (socket: AuthentificatedSocketConnection) => {
        console.info(`New socket connected`);
    });

    SocketServer.on('disconnect', (socket: AuthentificatedSocketConnection) => {
        console.info(`Socket disconnected`);
    });

    console.info('Sockets server initialized');
}

export function getSocketServer() {
    return SocketServer;
}
