import { IUsers } from '@/entities/Users/persistance/Users.interfaces';
import { IEvents } from '@/entities/Events/persistance/Events.interfaces';

export type RequestInterfaceBody = {};

export type RequestInterfaceQuery = {
    sortBy: 'progression24hours' | 'progression7days' | 'progression30days' | 'count' | 'avgPrice';
    sortOrder: number;
    page: number;
    limit: number;
};

export type RequestInterfaceParams = {
    [key: string]: unknown;
};

export type ResponseInterface = {
    total: number;
    events: Array<
        Omit<IEvents, 'sections'> & {
            sales: {
                avg: number;
                count: number;
                priceAvgProgression: {
                    day: number;
                    week: number;
                    month: number;
                };
                priceAvgHistory: Array<{
                    time: number;
                    value: number;
                }>;
            };
        }
    >;
};
