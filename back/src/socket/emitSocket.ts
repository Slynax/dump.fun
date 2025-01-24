import { SocketActionLabel } from './types';
import { getSocketServer } from './index';

export const emitSocket = ({ channel, action, data }: { channel: Array<string> | string; action: SocketActionLabel; data: any }) => {
    const socketServer = getSocketServer();
    socketServer.to(channel).emit('update', {
        action,
        data,
    });
};
