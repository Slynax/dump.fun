import { IUsers } from '@/entities/Users/persistance/Users.interfaces';
import { IEvents } from '@/entities/Events/persistance/Events.interfaces';

export type RequestInterfaceBody = {};

export type RequestInterfaceQuery = {
    token: string;
};

export type RequestInterfaceParams = {
    [key: string]: unknown;
};

export type ResponseInterface = {
    data: Array<{
        top: number;
        bottom: number;
        open: number;
        close: number;
    }>
};
