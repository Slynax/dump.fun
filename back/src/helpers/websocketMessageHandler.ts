import {subscribeToEvent, unsubscribeToken} from "../services/solana/listener";
import {Socket} from "socket.io";
import {emitSocket} from "../socket/emitSocket";
import {SocketActionLabel} from "../socket/types";

export const websocketMessageHandler = ({ socket, data }: { socket: Socket; data: any }) => {
    console.log('HERE IS GOOD', data);
    switch (data.type) {
        case 'subscribe':
            socket.join([data.key]);
            subscribeToEvent({ programId: data.key });
            break;
        case 'unsubscribe':
            socket.leave(data.key);
            unsubscribeToken({ key: data.key });
            break;
        default:
            console.log(data);
    }
}
