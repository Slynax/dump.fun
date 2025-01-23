import { Socket } from 'socket.io';
import { IUsers } from '@/entities/Users/persistance/Users.interfaces';

export interface AuthentificatedSocketConnection extends Socket {
    data: {
        user: IUsers;
    };
}

export enum SocketActionLabel {
    NEW_SALES = 'new-sales',
    UPDATE_STATS = 'update-stats',
    UPSERT_ACTION = 'upsert-action',
    UPSERT_USER_ACTION = 'upsert-user-action',
    NEW_NOTIFICATION = 'new-notification',
    INTEGRATION_UPDATE = 'integration-update',
    UPSERT_TICKETS = 'upsert-tickets',
}
